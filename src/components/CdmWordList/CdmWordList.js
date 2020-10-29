/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.17
 */
import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBBadge } from 'mdbreact';
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
 * @requires mdbreact
 * @requires react-redux
 * @requires '../../actions/wordAction'
 * @param {Function} useSelector the selector function that returns state.cdmWords: { data, isLoading, error }
 *
 * @example
 * return (
 *      <CdmWordList />
 * );
 */
const CdmWordList = ({ disabled = false }) => {
    //here we watch for the loading prop in the redux store. every time it gets updated, our component will reflect it
    const { data, isLoading, error } = useSelector(
        (state) => state.word.similarWords
    );
    const dispatch = useDispatch();

    const handleOnClickCdmWord = (cdmWord, markedWord) => {
        dispatch(setChangeEmrWord({ cdmWord, markedWord }));
    };

    return (
        <div className='d-flex flex-grow-1 flex-column h-100 pb-3'>
            <h5 className='text-center pt-2'>Recommended CDM Word List</h5>
            <hr
                className='mx-1 my-1'
                style={{
                    backgroundColor: 'black',
                    opacity: '0.2',
                    height: '0.1em',
                }}
            />
            <div className='flex-grow-1 flex-wrap overflow-auto'>
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
                            <h3>
                                <MDBBadge color='warning'>
                                    {data.emrWordId}
                                </MDBBadge>
                            </h3>
                            <MDBListGroup>
                                {data.cdmWordsList.map(
                                    ({ id_word_cdm, float_similarity }) => {
                                        return (
                                            <MDBListGroupItem
                                                hover
                                                style={{ cursor: 'pointer' }}
                                                key={id_word_cdm}
                                                disabled={disabled}
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
                                                {id_word_cdm} -{' '}
                                                {float_similarity * 100}%
                                            </MDBListGroupItem>
                                        );
                                    }
                                )}
                            </MDBListGroup>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default CdmWordList;
