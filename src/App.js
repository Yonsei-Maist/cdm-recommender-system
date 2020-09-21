import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import TextArea from './components/TextArea/TextArea';
import CdmWordList from './components/CdmWordList/CdmWordList';

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoadDataModal from './components/LoadDataModal/LoadDataModal';

const App = () => {
    const [show, setShow] = useState(false);
    const [textArea, setTextArea] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleOnDoubleCLickLoardDataItem = (data) => {
        setTextArea(data);
        handleClose();
    };

    const handleOnClickLoardButton = () => {
        handleShow();
    };

    const handleOnChangeTextArea = (markedText) => {
        setTextArea(markedText);
    };
    const handleOnBlurTextArea = (markedText) => {
        setTextArea(markedText);
    };

    return (
        <div className='mx-auto mt-5 d-flex flex-column vh-90'>
            <Header />
            <Container className='d-flex flex-grow-1'>
                <Row className='flex-grow-1'>
                    <Col md={8} className='d-flex flex-grow-1 flex-column mt-3'>
                        <Row className='mx-0 my-2'>
                            <Col
                                xs={{ order: 2, span: 6 }}
                                sm={{ order: 1, span: 2 }}
                                className='d-flex justify-content-start align-items-center'
                            >
                                <Button onClick={handleOnClickLoardButton}>
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
                                <Button>Save</Button>
                            </Col>
                        </Row>
                        <Row className='flex-grow-1 mx-0'>
                            <TextArea
                                html={textArea}
                                onChange={handleOnChangeTextArea}
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
                handleOnDoubleCLick={handleOnDoubleCLickLoardDataItem}
            />
        </div>
    );
};

export default App;
