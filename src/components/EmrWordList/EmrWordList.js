/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.29
 */
import React, { useState } from 'react';
import { MDBBtn, MDBBadge } from 'mdbreact';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getSimilarWordsRequest } from '../../actions/wordAction';

/**
 * Renders recommended CDM words list
 *
 * ### Usage
 *
 * ```
 * import EmrWordList from './components/EmrWordList/EmrWordList';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires mdbreact
 * @requires react-bootstrap-4-pagination
 * @requires react-redux
 * @param {Function} useSelector the selector function that returns state.cdmWords: { data, isLoading, error }
 *
 * @example
 * return (
 *      <EmrWordList />
 * );
 */
const EmrWordList = () => {
    const NUMBER_OF_SYNONYMS_PER_EMR_WORD = 5;
    const NUMBER_OF_EMR_WORDS_PER_PAGE = 20;
    const PAGE_RANGE_DISPLAYED = 10;
    const [totalItemsCount, setTotalItemsCount] = useState(450);
    const [activePage, setActivePage] = useState(1);

    const dispatch = useDispatch();

    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber);
    };

    const renderEmrSynonyms = () => {
        const out = [];
        for (var i = 1; i <= NUMBER_OF_SYNONYMS_PER_EMR_WORD; i++) {
            out.push(
                <MDBBadge 
                    key={i}
                    pill
                    color='success'
                    className='p-2 mb-2 mr-2'
                    disabled
                >
                    Synonyms {i}
                </MDBBadge >
            );
        }
        out.push(
            <MDBBtn
                key={i}
                color='transparent'
                className='p-0 blue-text text-capitalize'
                style={{
                    boxShadow: 'none',
                }}
            >
                Show All...
            </MDBBtn>
        );

        return out;
    };

    const handleOnClickEmrWord = (emrWord) => {
        dispatch(getSimilarWordsRequest(emrWord));
    };

    const renderEmrWordList = () => {
        const out = [];
        for (let i = 1; i <= NUMBER_OF_EMR_WORDS_PER_PAGE; i++) {
            out.push(
                <div
                    key={i}
                    className='d-flex flex-row my-4 justify-content-center align-items-center'
                >
                    <div className='text-center'>
                        <MDBBtn
                            color='warning'
                            style={{ width: '15em' }}
                            onClick={() => handleOnClickEmrWord('cold')}
                        >
                            EMR WORD {i}
                        </MDBBtn>
                    </div>
                    <div className='flew-grow-1 px-2'>
                        {renderEmrSynonyms()}
                    </div>
                </div>
            );
        }

        return out;
    };

    return (
        <div className='d-flex flex-grow-1 flex-column'>
            <h5 className='pt-2'>EMR Word List</h5>
            <hr
                className='mx-1 my-1'
                style={{
                    backgroundColor: 'black',
                    opacity: '0.2',
                    height: '0.1em',
                }}
            />
            <div
                className='flex-grow-1'
                style={{
                    height: '65vh',
                    overflowY: 'auto',
                    marginBottom: '2em',
                }}
            >
                {renderEmrWordList()}
            </div>
            <Pagination
                activePage={activePage}
                totalItemsCount={totalItemsCount}
                itemsCountPerPage={NUMBER_OF_EMR_WORDS_PER_PAGE}
                pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
                onChange={handlePageChange}
                itemClass='page-item'
                linkClass='page-link'
                innerClass='pagination pg-blue justify-content-center'
            />
        </div>
    );
};

export default EmrWordList;
