/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.18
 */
import React, { useEffect } from 'react';
import { ListGroup, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
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
 * @requires '../../actions/docAction'
 * @param {Function} useDispatch the dispatch function that triggers an action
 * @param {Function} useSelector the selector function that returns state.userData: { data, isLoading, error }
 */
const LoadDataModal = (props) => {
    const { show, onHide, handleOnDoubleCLick } = props;

    //here we watch for the loading prop in the redux store. every time it gets updated, our component will reflect it
    const { data, isLoading, error } = useSelector(
        (state) => state.doc.docList
    );

    return (
        <Modal animation={false} show={show} onHide={onHide} centered={true}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h4>Load Data</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading && <div>Loading...</div>}
                {error && <div className='text-danger'>{error}</div>}
                {!isLoading && !error && data && data.length === 0 && (
                    <p>Empty</p>
                )}
                {!isLoading && !error && data && data.length !== 0 && (
                    <ListGroup style={{ overflowY: 'auto', height: '60vh' }}>
                        {data.map(({ id, title }) => {
                            return (
                                <ListGroup.Item
                                    action
                                    onDoubleClick={() =>
                                        handleOnDoubleCLick(id)
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
