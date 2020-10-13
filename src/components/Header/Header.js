/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.17
 */
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Renders Header of the page
 *
 * ### Usage
 *
 * ```
 * import Header from './components/Header/Header';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires react-bootstrap
 *
 * @example
 * return (
 *      <Header logo="images/logo70.png" />
 * );
 */
const Header = ({ logo }) => {
    return (
        <Container className='text-start'>
            <Row>
                {logo && (
                    <Col md={'auto'} className='pr-0'>
                        <Image src={logo} alt='logo' />
                    </Col>
                )}
                <Col className='d-flex justify-content-start align-items-center'>
                    <h5>Yonsei University, Wonju College of Medicine</h5>
                </Col>
            </Row>
        </Container>
    );
};

Header.propTypes = {
    /**
     * path to logo image
     */
    logo: PropTypes.string,
};

Header.defaultProps = {
    logo: '',
}

export default Header;
