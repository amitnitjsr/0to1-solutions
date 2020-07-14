import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { Row, Col } from 'reactstrap';
import { connect } from "react-redux";
import './Prod_List.css';
class Prod_List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            type: 'Name'
        }
    }

    addCartsHandler = (id, count) => {
        this.props.pushListCarts(id, count);
    }

    selectHandler = (event) => {
        this.setState({ type: event.target.value })
    }

    inputHandler = (event) => {
        this.setState({ search: event.target.value }, () => {
            if (this.state.search === '')
                this.props.search(this.state.type, this.state.search)
        })
    }

    searchHandler = () => {
        this.props.search(this.state.type, this.state.search)
    }

    render() {
        return (
            <div>
                <Row className="margin">
                    <Col className="inputstyle">
                        <select className="select" onClick={(event) => this.selectHandler(event)}>
                            <option>Name</option>
                            <option>Category</option>
                        </select>&nbsp;
                        <input className="input" type="search" placeholder="search..." value={this.state.search} onChange={(event) => this.inputHandler(event)} />&nbsp;
                        <button className="search-btn" type="submit" onClick={() => this.searchHandler()} > search</button>
                    </Col>
                </Row>

                <div className="parent" >
                    {this.props.list ?
                        this.props.list.map((val) => {
                            return (
                                < Card key={val.id} className="card-style">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="300"
                                            image={val.image}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                <Rating
                                                    name="simple-controlled"
                                                    value={val.rating}
                                                /><br />
                                                <span style={{ color: 'black', fontWeight: 'bold', fontSize: '17px' }}>
                                                    {val.pro_name}
                                                </span>
                                            </Typography>
                                            <Typography variant="body2" color="black" component="p">
                                                <span style={{ color: 'black' }}>
                                                    {val.description}
                                                </span>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <span style={{ color: '#007bff' }}>
                                            {'$' + val.price}
                                        </span>
                                        <Button color="primary" style={{ marginLeft: 'auto' }}
                                            onClick={() => this.addCartsHandler(val.id, val.count)}>
                                            Add Cart
                                        </Button>
                                    </CardActions>
                                </Card >
                            )
                        })
                        : null}
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
        pushListCarts: (id, count) => {
            dispatch({
                type: 'pushListCarts',
                payload: {
                    "id": id, "count": count
                }
            })
        },
        search: (type, searchInput) => {
            dispatch({
                type: 'search',
                payload: {
                    "type": type, "searchInput": searchInput
                }
            })
        },

    }
}

export default connect(mapStateToProps, mapDispachToProps)(Prod_List);
