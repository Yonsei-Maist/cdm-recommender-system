/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.17
 */
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setChangeEmrWord } from '../../actions/wordAction';

/**
 * Renders recommended CDM words list
 *
 * ### Usage
 *
 * ```
 * import CdmWordList from './components/CdmWordList/CdmWordList';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires react-bootstrap
 * @requires react-redux
 * @param {Function} useSelector the selector function that returns state.cdmWords: { data, isLoading, error }
 *
 * @example
 * return (
 *      <CdmWordList />
 * );
 */
const CdmWordList = () => {
    //here we watch for the loading prop in the redux store. every time it gets updated, our component will reflect it
    const { data, isLoading, error } = useSelector(
        (state) => state.word.similarWords
    );
    const dispatch = useDispatch();

    const handleOnClickCdmWord = (cdmWord, markedWord) => {
        dispatch(setChangeEmrWord({ cdmWord, markedWord }));
    };

    return (
        <div className='d-flex flex-grow-1 flex-column'>
            <h5 className='text-center py-2'>Recommended CDM word list</h5>
            <hr
                className='mx-1 my-2'
                style={{
                    backgroundColor: 'black',
                    opacity: '0.2',
                    height: '0.1em',
                }}
            />
            <div className='flex-grow-1 flex-wrap'>
                {isLoading && <div>Loading...</div>}
                {error && <div className='text-danger'>{error}</div>}
                {!isLoading &&
                    !error &&
                    data &&
                    data.cdmWordsList &&
                    data.cdmWordsList.length === 0 && <p>Empty</p>}
                {!isLoading &&
                    !error &&
                    data &&
                    data.cdmWordsList &&
                    data.cdmWordsList.length !== 0 && (
                        <div>
                            <h6>{data.emrWordId}</h6>
                            <ListGroup
                                style={{ overflowY: 'auto', height: '55vh' }}
                            >
                                {data.cdmWordsList.map(
                                    ({ id_word_cdm, float_similarity }) => {
                                        return (
                                            <ListGroup.Item
                                                action
                                                key={id_word_cdm}
                                                onClick={() =>
                                                    handleOnClickCdmWord(
                                                        {
                                                            emrWordId:
                                                                data.emrWordId,
                                                            cdmWordId: id_word_cdm,
                                                            floatSimilarity: float_similarity,
                                                        },
                                                        data.markedWord
                                                    )
                                                }
                                            >
                                                {id_word_cdm}
                                            </ListGroup.Item>
                                        );
                                    }
                                )}
                            </ListGroup>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default CdmWordList;
