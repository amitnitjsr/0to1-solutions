import React from 'react';
import { withRouter } from 'react-router-dom';
import { Col } from 'reactstrap';
import './Navbar.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import NotificationBadge from 'react-notification-badge';
import { connect } from 'react-redux';



const drawerWidth = 0;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));


function Navbar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Col md='2'> <span className="home" onClick={() => props.history.push('./')}> <i className="zmdi zmdi-home zmdi-hc-lg" /></span></Col>
                    <Col className="col-md-1 col-sm-1 ml-auto">
                        <span>
                            <Link to='/cart' style={{ color: 'black' }}>
                                <i className="zmdi zmdi-shopping-cart zmdi-hc-lg"></i>
                                <NotificationBadge count={props.cartData.length} className="st" >
                                </NotificationBadge>
                            </Link>
                        </span>
                        <span >
                        </span>
                    </Col>
                </Toolbar>
            </AppBar>
        </div >
    );
}

const mapStateToProps = (state) => {
    return {
        cartData: state.cartData,
    }
}

export default connect(mapStateToProps, null)(withRouter(Navbar));
