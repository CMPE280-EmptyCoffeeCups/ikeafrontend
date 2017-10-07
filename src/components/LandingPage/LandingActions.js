import React, {Component} from 'react';
import {connect} from 'react-redux';
import {doAuthentication, doLogout, showLogin} from "../../redux/actions/user";

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import {Link} from 'react-router-dom';


const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        position: 'absolute',
        bottom: '10%'
    },
    button: {
        width: '100%',
        opacity: 0.6,
        background: '#00319B',
        color: '#FFFFFF',
        textTransform: 'capitalize',
        fontFamily: 'Raleway, sans-serif',
        fontSize: 20,
    },
    loginSignUp : {
        textAlign: 'center',
        color: '#FFFFFF',
        textTransform: 'capitalize',
        fontFamily: 'Raleway, sans-serif'
    }
});

class LandingActions extends Component {

    constructor(props) {
        super(props);
        props.doAuthentication();
    }

    render() {
        const {classes, isAuthenticated, name} = this.props;
        let auth;
        if(isAuthenticated){
            auth = <div>
                <p>Welcome, {name} !! </p>
                <Button
                    className={classes.loginSignUp}
                    onClick={() => (this.props.doLogout())}
                >
                    Logout
                </Button>
            </div>;
        } else {
            auth = <Button
                className={classes.loginSignUp}
                onClick={() => (this.props.showLogin())}
            >
                Login | Sign Up
            </Button>;
        }

        return (
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid item md={3} sm={8} xs={8}>
                        <Link to={'/welcome'} className={'linkTag'}>
                            <Button
                                raised
                                color="primary"
                                className={classes.button}
                            >
                                Start Shopping
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <Grid className={classes.loginSignUp} item md={4} sm={8} xs={8}>
                        {auth}
                    </Grid>
                </Grid>
            </div>
        );
    }
}


function mapStateToProps({user}) {
    const {isAuthenticated, profile} = user;
    let name;
    if(isAuthenticated) {
        const profJSON = JSON.parse(profile);
        if (profJSON.name) {
            name = profJSON.name;
        } else {
            name = profJSON.email;
        }
    }

    return {
        isAuthenticated,
        name
    }
}

function mapDispatchToProps(dispatch){
    return {
        showLogin: (data) => dispatch(showLogin()),
        doAuthentication: (data) => dispatch(doAuthentication()),
        doLogout: (data) => dispatch(doLogout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(LandingActions));