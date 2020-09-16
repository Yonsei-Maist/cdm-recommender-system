import React, { useState } from 'react';
import { Button, Col, Container, Row, Modal, ListGroup } from 'react-bootstrap';

import './App.css';

function App() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleOnClickLoardDataItem(id) {
        console.log(id);
        alert('You clicked the third ListGroupItem');
        handleClose();
    }

    const textArea = 'In my opinion, this patient have cold and .....';
    const cmdRecommendedWords = ['Common cold – 92%', 'Coryza – 4%​ Flu – 2%'];
    const mapUserWordsToCmdRecommendedWords = new Map();
    mapUserWordsToCmdRecommendedWords.set('cold', cmdRecommendedWords);
    const loardedData = [
        {
            id: '1',
            title: 'title 1',
            data: 'data 1',
        },
        {
            id: '2',
            title: 'title 2',
            data: 'data 2',
        },
    ];

    return (
        <div className='mx-auto mt-5 d-flex flex-column vh-90'>
            <Container className='text-start mb-5'>
                Yonsei University, Wonju College of Medicine
            </Container>
            <Container className='d-flex flex-grow-1'>
                <Row className='flex-grow-1'>
                    <Col md={8} className='d-flex flex-column'>
                        <Row>
                            <Col md='auto' className='align-items-start'>
                                <Button onClick={handleShow}>Load</Button>
                            </Col>
                            <Col className='text-center'>
                                <h4>CDM Recommender System</h4>
                            </Col>
                            <Col md='auto' className='align-items-end'>
                                <Button>Save</Button>
                            </Col>
                        </Row>
                        <Row className='flex-grow-1'>
                            <div
                                contenteditable='true'
                                className='mx-2 p-3 w-100 border border-secondary rounded'
                                data-ph='Please input your text.'
                            >
                                In my opinion, this patient have{' '}
                                <mark>cold</mark> and .....
                            </div>
                        </Row>
                    </Col>
                    <Col md={4} className='border border-primary'>
                        <h5 className='text-center py-2'>
                            Recommended CDM word list
                        </h5>
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
                    </Col>
                </Row>
            </Container>
            <Container className='text-center mt-5'>
                @Medical Artificial Intelligence Service Team - MAIST
            </Container>

            <Modal animation={false} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Load Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {loardedData.map(({ id, title }) => {
                            return (
                                <ListGroup.Item
                                    action
                                    onClick={() =>
                                        handleOnClickLoardDataItem(id)
                                    }
                                    key={id}
                                >
                                    {title.toUpperCase()}
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default App;
