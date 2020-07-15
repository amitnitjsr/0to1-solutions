import React from 'react'
import ReactTable from 'react-table';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import './Carts.css';

class Carts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            selectedRow: null,
            hideButton: false
        }
    }


    toggleRow = (row) => {
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[row.id] = !this.state.selected[row.id];
        this.setState({ selected: newSelected }, () => {
            if (this.state.selected[row.id] === false) {
                delete this.state.selected[row.id];
            }
            if (Object.keys(this.state.selected).length !== 0) {
                this.setState({ hideButton: true })
            }
            else {
                this.setState({ hideButton: false })
            }

        })
    }

    deleteHandler = (id) => {
        if (Object.keys(this.state.selected).length !== 0) {
            this.props.deleteCartListById(this.state.selected);
            this.setState({ selectedRow: null, selected: {}, hideButton: false })
        }
        else {
            const newSelected = Object.assign({}, this.state.selected);
            newSelected[id] = !this.state.selected[id];
            this.props.deleteCartListById(newSelected);
        }
    }

    addHandler = (row) => {
        this.props.addListCart(row.id, row.count);
    }

    minusHandler = (row) => {
        this.props.subCartList(row.id, row.count);
    }

    render() {

        return (
            <div className="margin" >

                <Col md='2'></Col>
                <Col md='10' style={{ position: 'relative', margin: 'auto' }}>
                    <span style={{
                        fontSize: '20px',
                        fontWeight: '800'
                    }}>YOUR CART</span>

                    <ReactTable
                        data={this.props.cartData ? this.props.cartData : []}
                        columns={[
                            {
                                Header: () => <div className="ID"></div>,
                                id: 'row',
                                className: 'ID TextCenter',
                                headerClassName: 'ID TextCenter',
                                Cell: (row) => {
                                    return (
                                        <div className='text-center pt-3'>
                                            <Checkbox
                                                checked={this.state.selected[row.row._original.id] === true}
                                                onChange={() => {
                                                    this.toggleRow(row.row._original);
                                                }}
                                            />
                                        </div>
                                    )
                                },
                                sortable: false,
                                filterable: false,
                                foldable: false,
                                width: 75
                            },
                            {
                                Header: () => <div className="Header" style={{ textAlign: 'initial' }} >Product Name</div>,
                                className: 'Name TextCenter',
                                headerClassName: 'Name TextCenter',
                                Cell: (row) => {
                                    return (
                                        <div >
                                            <Row>
                                                <Col >
                                                    <img src={row.row._original.image}
                                                        width="100%" height="100%" alt='no-img' />
                                                </Col>
                                                <Col>
                                                    <span>
                                                        {row.row._original.pro_name}
                                                    </span><br />
                                                    <span>
                                                        Color: {row.row._original.color}
                                                    </span><br />
                                                    <span>
                                                        Size: {row.row._original.size}
                                                    </span>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                },
                                foldable: false,
                                width: 200
                            },
                            {
                                Header: () => <div className="Header" >Price</div>,
                                foldable: false,
                                className: 'company TextCenter',
                                headerClassName: 'company TextCenter',
                                Cell: (row) => {
                                    return (
                                        <div className='text-center pt-4'>
                                            ${row.row._original.price}
                                        </div>
                                    )
                                },
                            },
                            {
                                Header: () => <div className="Header" >QTY</div>,
                                accessor: 'company',
                                foldable: true,
                                className: 'company TextCenter',
                                headerClassName: 'company TextCenter',
                                Cell: (row) => {
                                    return (
                                        <div className='text-center pt-4'>
                                            <IconButton
                                                disabled={row.row._original.count === 1 || this.state.hideButton}
                                                onClick={() => this.minusHandler(row.row._original)}>
                                                <i className="zmdi zmdi-minus-circle-outline"></i>
                                            </IconButton>
                                           &nbsp;&nbsp;
                                            <span>
                                                {row.row._original.count}
                                            </span>&nbsp;&nbsp;
                                            <IconButton
                                                disabled={this.state.hideButton}
                                                onClick={() => this.addHandler(row.row._original)}>
                                                <i className="zmdi zmdi-plus-circle-o"></i>
                                            </IconButton>
                                            &nbsp;&nbsp;
                                        </div>
                                    )
                                },
                            },
                            {
                                Header: () => <div className="Header" >Total</div>,
                                accessor: 'company',
                                foldable: true,
                                className: 'company TextCenter',
                                headerClassName: 'company TextCenter',
                                Cell: (row) => {
                                    return (
                                        <div className='text-center pt-4'>
                                            <span>
                                                ${row.row._original.count * row.row._original.price}
                                            </span>
                                        </div>
                                    )
                                },
                            },
                            {
                                Header: () => <div className="Header" >Action</div>,
                                accessor: 'company',
                                foldable: true,
                                className: 'company TextCenter',
                                headerClassName: 'company TextCenter',
                                Cell: (row) => {
                                    return (
                                        <div className='text-center pt-4' >
                                            <IconButton onClick={() => this.deleteHandler(row.row._original.id)}
                                            >
                                                <i className="zmdi zmdi-delete "></i>
                                            </IconButton>

                                        </div>
                                    )
                                },
                            },
                            {
                                Footer: () => <div style={{
                                    position: 'relative',
                                    height: '40px'
                                }}>
                                    <Col >
                                        <span style={{ marginLeft: '-450px', position: 'relative' }}>Total</span>
                                        <span style={{
                                            position: 'relative',
                                            marginLeft: '150px'
                                        }}>$ {this.props.totalPrice}
                                        </span>
                                    </Col>
                                </div>
                            }
                        ]}
                        pageSize={this.props.cartData.length}
                        showPaginationBottom={false}
                    />
                    <Row className="col-md-3 col-sm-3 ml-auto " style={{ padding: '20px' }}>
                        <Link to='/success_buy'>
                            <Button className="btn_shop" disabled={this.props.cartData.length === 0}>
                                BUY NOW
                    </Button>
                        </Link>
                    </Row>
                </Col>
            </div >
        );
    }
}


const mapStateToProps = (state) => {
    return {
        cartData: state.cartData,
        totalPrice: state.totalPrice
    }
}

const mapDispachToProps = (dispatch) => {
    return {
        deleteCartListById: (id) => { dispatch({ type: "deleteCartListById", payload: { "id": id } }) },
        addListCart: (id, count) => {
            dispatch({
                type: 'addListCart',
                payload: {
                    "id": id, "count": count
                }
            })
        },
        subCartList: (id, count) => {
            dispatch({
                type: 'subCartList',
                payload: {
                    "id": id, "count": count
                }
            })
        },

    }
}

export default connect(mapStateToProps, mapDispachToProps)(Carts);