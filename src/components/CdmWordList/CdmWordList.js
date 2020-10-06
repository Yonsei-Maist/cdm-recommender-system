import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CdmWordList = () => {
    //here we watch for the loading prop in the redux store. every time it gets updated, our component will reflect it
    const cdmWords = useSelector((state) => state.cdmWords);
    const { data, isLoading, error } = cdmWords;

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
