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
                    <Col md={8} className='d-flex flex-column'>
                        <Row>
                            <Col md='auto' className='align-items-start'>
                                <Button onClick={handleOnClickLoardButton}>
                                    Load
                                </Button>
                            </Col>
                            <Col className='text-center'>
                                <h4>CDM Recommender System</h4>
                            </Col>
                            <Col md='auto' className='align-items-end'>
                                <Button>Save</Button>
                            </Col>
                        </Row>
                        <Row className='flex-grow-1'>
                            <TextArea
                                html={textArea}
                                onChange={handleOnChangeTextArea}
                                onBlur={handleOnBlurTextArea}
                            />
                        </Row>
                    </Col>
                    <Col md={4} className='border border-primary'>
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
