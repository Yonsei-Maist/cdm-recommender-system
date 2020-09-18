import React, { Component } from 'react';
import { ListGroup, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loadUserData } from '../../actions/loadUserDataAction';

class LoadDataModal extends Component {
    componentDidMount() {
        this.props.loadUserData();
    }

    render() {
        const {
            show,
            onHide,
            data,
            handleOnDoubleCLick,
            isLoading,
            error,
        } = this.props;

        return (
            <Modal animation={false} show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4>Load Data</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading && <div>Loading...</div>}
                    {error && (
                        <div style={{ color: 'red' }}>
                            ERROR: {this.props.error}
                        </div>
                    )}
                    {!isLoading && !error && (
                        <ListGroup>
                            {data &&
                                data.length &&
                                data.map(({ id, title, data }) => {
                                    return (
                                        <ListGroup.Item
                                            action
                                            onDoubleClick={() =>
                                                handleOnDoubleCLick(data)
                                            }
                                            key={id}
                                        >
                                            {title.toUpperCase()}
                                        </ListGroup.Item>
                                    );
                                })}
                        </ListGroup>
                    )}
                </Modal.Body>
            </Modal>
        );
    }
}

const mapStateToProps = ({ userData }) => ({
    ...userData,
});

const mapDispatchToProps = (dispatch) => ({
    loadUserData: () => dispatch(loadUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadDataModal);
