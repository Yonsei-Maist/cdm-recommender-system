/**
 * @file
 * @author Vicheka Phor, Yonsei Univ. Researcher, since 2020.10
 * @date 2020.10.29
 */
import React from 'react';
import { MDBContainer, MDBCard, MDBBtn } from 'mdbreact';
import EmrWordList from '../components/EmrWordList/EmrWordList';
import CdmWordList from '../components/CdmWordList/CdmWordList';

const EmrCdmWordsViewerPage = () => {
    const handleOnClickStartButton = () => {
        console.log('handleOnClickStartButton');
    };

    const handleOnClickInitButton = () => {
        console.log('handleOnClickInitButton');
    };

    return (
        <MDBContainer className='my-4 d-flex flex-column px-0'>
            <div className='text-right d-flex flex-row justify-content-end'>
                <MDBBtn
                    color='primary'
                    className='ml-3'
                    onClick={handleOnClickStartButton}
                >
                    Start
                </MDBBtn>
                <MDBBtn
                    color='primary'
                    className='ml-3'
                    onClick={handleOnClickInitButton}
                >
                    Init
                </MDBBtn>
            </div>
            <div className='flex-grow-1 d-flex flex-row flex-wrap flex-md-nowrap'>
                <MDBCard
                    className='flex-grow-1 mt-3 px-3'
                    style={{
                        minHeight: '60vh',
                    }}
                >
                    <EmrWordList />
                </MDBCard>
                <MDBCard
                    className='flex-grow-1 flex-lg-grow-0 ml-md-2 mt-3 px-3'
                    style={{ minHeight: '60vh', minWidth: '25vw' }}
                >
                    <CdmWordList disabled={true} />
                </MDBCard>
            </div>
        </MDBContainer>
    );
};

export default EmrCdmWordsViewerPage;
