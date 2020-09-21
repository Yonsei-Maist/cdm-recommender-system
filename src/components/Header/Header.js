import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Header = () => {
    return (
        <Container className='text-start mb-5'>
            <Row>
                <Col md={'auto'} className='pr-0'>
                    <Image
                        src={process.env.PUBLIC_URL + '/logo70.png'}
                        alt='logo'
                    />
                </Col>
                <Col className='d-flex justify-content-start align-items-center'>
                    <h5>Yonsei University, Wonju College of Medicine</h5>
                </Col>
            </Row>
        </Container>
    );
};

export default Header;
