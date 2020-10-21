/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.16
 */
import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import TextArea from './components/TextArea/TextArea';
import CdmWordList from './components/CdmWordList/CdmWordList';

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoadDataModal from './components/LoadDataModal/LoadDataModal';
import GlobalErrorNotification from './components/GlobalErrorNotification/GlobalErrorNotification';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInputText } from './actions/userDataAction';
import { getDocDetailsRequest } from './actions/docAction';

/**
 * Renders Application Component
 *
 * ### Usage
 *
 * ```
 * import App from './App';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires react-bootstrap
 * @requires react-redux
 * @requires './actions/userDataAction'
 * @requires './components/TextArea/TextArea'
 * @requires './components/CdmWordList/CdmWordList'
 * @requires './components/Header/Header'
 * @requires './components/Footer/Footer'
 * @requires './components/LoadDataModal/LoadDataModal'
 * @param {Function} useDispatch the dispatch function that triggers an action
 * @param {Function} useSelector the selector function that returns state.userData.inputText
 * @param {Function} useState react useState hook for states: show
 */
const App = () => {
    const [show, setShow] = useState(false);
    //this hook allows us to access the dispatch function
    const dispatch = useDispatch();
    //here we watch for the loading prop in the redux store. every time it gets updated, our component will reflect it
    const userInputText = useSelector((state) => state.userData.inputText);

    /**
     * @method
     * @memberof App
     */
    const handleClose = () => setShow(false);
    /**
     * @method
     * @memberof App
     */
    const handleShow = () => setShow(true);
    /**
     * @method
     * @memberof App
     */
    const handleOnDoubleClickLoadDataItem = (docId) => {
        dispatch(getDocDetailsRequest(docId));
        handleClose();
    };

    /**
     * @method
     * @memberof App
     */
    const handleOnClickLoadButton = () => {
        handleShow();
    };

    /**
     * @method
     * @memberof App
     */
    const handleOnClickSaveButton = () => {
        console.log(userInputText);
    };

    /**
     * @method
     * @memberof App
     */
    const handleOnKeyUpTextArea = (markedText) => {
        dispatch(setUserInputText(markedText));
    };
    /**
     * @method
     * @memberof App
     */
    const handleOnBlurTextArea = (markedText) => {
        dispatch(setUserInputText(markedText));
    };

    return (
        <div className='mx-auto mt-5 d-flex flex-column vh-90'>
            <GlobalErrorNotification />
            <Header logo={process.env.PUBLIC_URL + '/logo70.png'} />
            <Container className='d-flex flex-grow-1 my-5'>
                <Row className='flex-grow-1'>
                    <Col md={8} className='d-flex flex-grow-1 flex-column mt-3'>
                        <Row className='mx-0 my-2'>
                            <Col
                                xs={{ order: 2, span: 6 }}
                                sm={{ order: 1, span: 2 }}
                                className='d-flex justify-content-start align-items-center'
                            >
                                <Button onClick={handleOnClickLoadButton}>
                                    Load
                                </Button>
                            </Col>
                            <Col
                                xs={{ order: 1, span: 12 }}
                                sm={{ order: 2, span: 8 }}
                                className='d-flex text-center justify-content-center align-items-center mt-n5'
                            >
                                <h4>CDM Recommender System</h4>
                            </Col>
                            <Col
                                xs={{ order: 3, span: 6 }}
                                sm={{ order: 3, span: 2 }}
                                className='d-flex justify-content-end align-items-center'
                            >
                                <Button onClick={handleOnClickSaveButton}>Save</Button>
                            </Col>
                        </Row>
                        <Row className='flex-grow-1 mx-0'>
                            <TextArea
                                html={userInputText}
                                onKeyUp={handleOnKeyUpTextArea}
                                onBlur={handleOnBlurTextArea}
                            />
                        </Row>
                    </Col>
                    <Col
                        md={4}
                        className='d-flex flex-grow-1 border border-primary mt-3 pr-2'
                    >
                        <CdmWordList />
                    </Col>
                </Row>
            </Container>
            <Footer />

            <LoadDataModal
                show={show}
                onHide={handleClose}
                handleOnDoubleCLick={handleOnDoubleClickLoadDataItem}
            />
        </div>
    );
};

export default App;
