/**
 * @file
 * @author phorvicheka, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.17
 */
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

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
    const { data, isLoading, error } = useSelector((state) => state.cdmWords);

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
            {isLoading && <div>Loading...</div>}
            {error && (
                <div style={{ color: 'red' }}>ERROR: {this.props.error}</div>
            )}
            <div className='flex-grow-1 flex-wrap'>
                {!isLoading && !error && data && data.length > 0 && (
                    <ListGroup style={{ overflowY: 'auto', height: '55vh' }}>
                        {data.map(({ id, data }) => {
                            return (
                                <ListGroup.Item action key={id}>
                                    {data}
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                )}
            </div>
        </div>
    );
};

export default CdmWordList;
