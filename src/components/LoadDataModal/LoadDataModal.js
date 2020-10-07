/**
 * @file
 * @author phorvicheka <phorvicheka@yahoo.com>
 * @date 2020-09-18
 */
import React, { useEffect } from 'react';
import { ListGroup, Modal } from 'react-bootstrap';
import { loadUserData } from '../../actions/userDataAction';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Renders pop up modal to load the user's saved data
 *
 * ### Usage
 *
 * ```
 * import LoadDataModal from './components/LoadDataModal/LoadDataModal';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires react-bootstrap
 * @requires react-redux
 * @requires '../../actions/userDataAction'
 * @param {Function} useDispatch the dispatch function that triggers an action
 * @param {Function} useSelector the selector function that returns state.userData: { data, isLoading, error }
 */
const LoadDataModal = (props) => {
    const { show, onHide, handleOnDoubleCLick } = props;

    //this hook allows us to access the dispatch function
    const dispatch = useDispatch();
    //here we watch for the loading prop in the redux store. every time it gets updated, our component will reflect it
    const { data, isLoading, error } = useSelector((state) => state.userData);

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
                {error && <div style={{ color: 'red' }}>ERROR: {error}</div>}
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

LoadDataModal.propTypes = {
    /**
     * boolean variable to toggle hide or show Modal
     */
    show: PropTypes.bool.isRequired,
    /**
     * function handler triggers when close Modal
     */
    onHide: PropTypes.func.isRequired,
    /**
     * function handler when double click on the item in the modal list
     */
    handleOnDoubleCLick: PropTypes.func.isRequired,
};

export default LoadDataModal;
