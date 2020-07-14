import React, { Component } from 'react';
import './Success.css';
import { connect } from 'react-redux';

class Success extends Component {

    componentDidMount() {
        this.props.clearListCarts();
    }

    render() {
        return (
            <div>
                <div className='text_style'>
                    <div >
                        <span>
                            Thank you,
                         </span><br />
                        <span>
                            Payment Successfully Received
                </span>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.list,
        totalPrice: state.totalPrice
    }
}

const mapDispachToProps = (dispatch) => {
    return {
        clearListCarts: () => {
            dispatch({
                type: 'clearListCarts',
                payload: {

                }
            })
        },

    }
}

export default connect(mapStateToProps, mapDispachToProps)(Success);

