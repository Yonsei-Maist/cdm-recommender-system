import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

class CdmWordList extends Component {
    render() {
        const { data, isLoading, error } = this.props;
        return (
            <div className='d-flex flex-grow-1 flex-column'>
                <h5 className='text-center py-2'>Recommended CDM word list</h5>
                <hr
                    className='mx-1 my-2'
                    style={{
                        backgroundColor: 'black',
                        opacity: '0.2',
                        height: '0.1em',
                    }}
                />
                {isLoading && <div>Loading...</div>}
                {error && (
                    <div style={{ color: 'red' }}>
                        ERROR: {this.props.error}
                    </div>
                )}
                <div className='flex-grow-1 flex-wrap'>
                    {!isLoading && !error && (data && data.length > 0) && (
                        <ListGroup
                            style={{ overflowY: 'auto', height: '55vh' }}
                        >
                            {data.map(({ id, data }) => {
                                return (
                                    <ListGroup.Item action key={id}>
                                        {data}
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ cdmWords }) => ({
    ...cdmWords,
});

export default connect(mapStateToProps)(CdmWordList);
