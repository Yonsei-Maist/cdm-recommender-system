import React, { useEffect } from 'react';
import { ListGroup, Modal } from 'react-bootstrap';
import { loadUserData } from '../../actions/userDataAction';
import { useDispatch, useSelector } from 'react-redux';

const LoadDataModal = (props) => {
    /*     componentDidMount() {
        this.props.loadUserData();
    } */
    const { show, onHide, handleOnDoubleCLick } = props;

    //this hook allows us to access the dispatch function
    const dispatch = useDispatch();
    //here we watch for the loading prop in the redux store. every time it gets updated, our component will reflect it
    const userData = useSelector((state) => state.userData);
    const { data, isLoading, error } = userData;

    useEffect(() => {
        dispatch(loadUserData());
    }, [dispatch]);

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
};

export default LoadDataModal;
