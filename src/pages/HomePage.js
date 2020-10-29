/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.29
 */
import React, { useState } from 'react';
import { MDBContainer, MDBCard, MDBBtn } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';

import CdmWordList from '../components/CdmWordList/CdmWordList';
import LoadDataModal from '../components/LoadDataModal/LoadDataModal';
import EditorWithMarkedWordFeature from '../components/EditorWithMarkedWordFeature/EditorWithMarkedWordFeature';
import { getDocListRequest, getDocDetailsRequest } from '../actions/docAction';

/**
 * Renders HomePagelication Component
 *
 * ### Usage
 *
 * ```
 * import HomePage from './HomePage';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires mdbreact
 * @requires react-redux
 * @requires '../components/CdmWordList/CdmWordList'
 * @requires '../components/LoadDataModal/LoadDataModal'
 * @requires '../components/EditorWithMarkedWordFeature/EditorWithMarkedWordFeature'
 * @requires '../actions/docAction'
 * @param {Function} useDispatch the dispatch function that triggers an action
 * @param {Function} useSelector the selector function that returns state.userData.inputText
 * @param {Function} useState react useState hook for states: show
 */
const HomePage = () => {
    const [show, setShow] = useState(false);
    //this hook allows us to access the dispatch function
    const dispatch = useDispatch();
    const content = useSelector((state) => state.content);

    /**
     * @method
     * @memberof HomePage
     */
    const handleClose = () => setShow(false);
    /**
     * @method
     * @memberof HomePage
     */
    const handleShow = () => setShow(true);
    /**
     * @method
     * @memberof HomePage
     */
    const handleOnDoubleClickLoadDataItem = (docId) => {
        dispatch(getDocDetailsRequest(docId));
        handleClose();
    };

    /**
     * @method
     * @memberof HomePage
     */
    const handleOnClickLoadButton = () => {
        dispatch(getDocListRequest());
        handleShow();
    };

    /**
     * @method
     * @memberof HomePage
     */
    const handleOnClickSaveButton = () => {
        console.log('handleOnClickSaveButton');
        console.log(content);
    };

    return (
        <>
            <MDBContainer className='my-4 d-flex flex-column px-0'>
                <div className='flex-grow-1 d-flex flex-row flex-wrap'>
                    <div className='flex-grow-1 d-flex flex-column px-0'>
                        <h3 className='text-center mb-lg-n4'>
                            CDM Recommender System
                        </h3>
                        <div className='d-flex flex-row justify-content-between my-2'>
                            <MDBBtn
                                color='primary'
                                onClick={handleOnClickLoadButton}
                            >
                                Load
                            </MDBBtn>
                            <MDBBtn
                                color='primary'
                                onClick={handleOnClickSaveButton}
                            >
                                Save
                            </MDBBtn>
                        </div>
                        <div
                            className='flex-grow-1 d-flex flex-column mx-0 overflow-auto border border-primary rounded'
                            style={{
                                minHeight: '40vh',
                                maxHeight: '50vh',
                                minWidth: '100%',
                                maxWidth: 'fit-content',
                            }}
                        >
                            <EditorWithMarkedWordFeature />
                        </div>
                    </div>
                    <MDBCard
                        className='flex-grow-1 flex-md-grow-0 ml-md-2 mt-3 mt-lg-0 px-3'
                        style={{ minHeight: '30vh', maxHeight: '70vh', minWidth: '25vw' }}
                    >
                        <CdmWordList />
                    </MDBCard>
                </div>
            </MDBContainer>

            <LoadDataModal
                show={show}
                onHide={handleClose}
                handleOnDoubleCLick={handleOnDoubleClickLoadDataItem}
            />
        </>
    );
};

export default HomePage;
