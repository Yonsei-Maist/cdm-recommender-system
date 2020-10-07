/**
 * @file
 * @author phorvicheka <phorvicheka@yahoo.com>
 * @date 2020-09-17
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
            @Medical Artificial Intelligence Solution Team - MAIST
        </Container>
    );
};

export default Footer;
