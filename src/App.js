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
    const [textArea, setTextArea] = useState(
        `In my opinion, this patient have cold and .....`
    );
    const [loardedData, setLoardedData] = useState([]);
    const [cmdRecommendedWords, setCmdRecommendedWords] = useState([
        'Common cold – 92%',
        'Coryza – 4%​ Flu – 2%',
    ]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleOnDoubleCLickLoardDataItem = (id) => {
        const selectLoardedData = loardedData.find((data) => {
            return data.id === id;
        });

        setTextArea(selectLoardedData.data);
        handleClose();
    };

    const handleOnClickLoardButton = () => {
        // fetching loardedData
        setLoardedData([
            {
                id: '1',
                title: 'title 1',
                data: 'In my opinion, this patient have cold and .....',
            },
            {
                id: '2',
                title: 'title 2',
                data: 'data 2',
            },
        ]);

        handleShow();
    };

    const handleOnChangeTextArea = (markedText) => {
        setTextArea(markedText);
    };
    const handleOnBlurTextArea = (markedText) => {
        setTextArea(markedText);
    };

    // This map object can be used for not sending request to server
    // if user used to send a request with that marked word.
    const mapUserWordsToCmdRecommendedWords = new Map();
    mapUserWordsToCmdRecommendedWords.set('cold', cmdRecommendedWords);

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
                        <CdmWordList
                            cmdRecommendedWords={cmdRecommendedWords}
                        />
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
