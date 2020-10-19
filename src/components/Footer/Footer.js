/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.09.17
 */
import React from 'react';
import { Container } from 'react-bootstrap';

/**
 * Renders Footer of the page
 *
 * ### Usage
 *
 * ```
 * import Footer from './components/Footer/Footer';
 * ```
 *
 * @component
 * @category Components
 * @requires react
 * @requires react-bootstrap
 *
 * @example
 * return (
 *      <Footer />
 * );
 */
const Footer = () => {
    return (
        <Container className='text-center'>
            &copy; 2020. YWCM MAIST. All Rights Reserved.
        </Container>
    );
};

export default Footer;
