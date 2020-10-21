/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.21
 */

import React from 'react';
import { Toast } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { hideError } from '../../actions/errorAction';

/**
 * Renders GlobalErrorNotification if an error occurs
 *
 * ### Usage
 *
 * ```
 * import GlobalErrorNotification from './components/GlobalErrorNotification/GlobalErrorNotification';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires react-bootstrap
 * @requires 'react-redux'
 * @requires '../../actions/errorAction'
 *
 * @example
 * return (
 *      <GlobalErrorNotification />
 * );
 */
const GlobalErrorNotification = (props) => {
    const { isShow, error } = useSelector((state) => state.error);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideError());
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
            }}
        >
            <Toast
                animation={false}
                onClose={handleClose}
                show={isShow}
                delay={3000}
                autohide
            >
                <Toast.Header className='bg-danger text-white'>
                    <strong className='mr-auto'>Error</strong>
                </Toast.Header>
                <Toast.Body>
                    <p className='text-danger'>{error}</p>
                </Toast.Body>
            </Toast>
        </div>
    );
};

export default GlobalErrorNotification;
