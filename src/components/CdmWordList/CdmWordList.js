import React from 'react';
import { ListGroup } from 'react-bootstrap';

const CdmWordList = ({ cmdRecommendedWords }) => {
    return (
        <div>
            <h5 className='text-center py-2'>Recommended CDM word list</h5>
            <hr className='mt-0' />
            <ListGroup>
                {cmdRecommendedWords.map((value, index) => {
                    return (
                        <ListGroup.Item action key={index}>
                            {value}
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    );
};

export default CdmWordList;
