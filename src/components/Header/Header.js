import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

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

export default Header;
