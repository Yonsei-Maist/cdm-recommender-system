import React from 'react';
import { ListGroup, Modal } from 'react-bootstrap';

const LoardDataModal = ({ show, onHide, data, handleOnDoubleCLick }) => {
    return (
        <Modal animation={false} show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h4>Load Data</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {data.map(({ id, title }) => {
                        return (
                            <ListGroup.Item
                                action
                                onDoubleClick={() => handleOnDoubleCLick(id)}
                                key={id}
                            >
                                {title.toUpperCase()}
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
};

export default LoardDataModal;
