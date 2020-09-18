import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

class CdmWordList extends Component {
    render() {
        const { data, isLoading, error } = this.props;
        return (
            <div>
                <h5 className='text-center py-2'>Recommended CDM word list</h5>
                <hr className='mt-0' />
                {isLoading && <div>Loading...</div>}
                {error && (
                    <div style={{ color: 'red' }}>
                        ERROR: {this.props.error}
                    </div>
                )}
                {!isLoading && !error && (
                    <ListGroup>
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
        );
    }
}

const mapStateToProps = ({ cdmWords }) => ({
    ...cdmWords,
});

export default connect(mapStateToProps)(CdmWordList);
