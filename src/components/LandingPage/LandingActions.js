import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import {withStyles} from 'material-ui/styles';
import {Link} from 'react-router-dom';

import Login from './Login';
import SignUp from './SignUp';


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

    static LOGIN_DIALOG = 1;
    static SIGNUP_DIALOG = 2;

    handleCloseLoginSignupDialog = () => {
        this.setState({loginOpen: false});
    };
    handleOpenLoginSignupDialog = (type) => {
        this.setState({
            loginOpen: true,
            type: type
        });
    };

    constructor() {
        super();
        this.state = {
            loginOpen: false
        }
    }

    render() {
        const classes = this.props.classes;

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
                    <Grid className={classes.loginSignUp} item md={3} sm={8} xs={8}>
                        <Button
                            className={classes.loginSignUp}
                            onClick={() => (this.handleOpenLoginSignupDialog(LandingActions.LOGIN_DIALOG))}
                        >
                            Login
                        </Button>
                        <Button
                            className={classes.loginSignUp}
                            onClick={() => (this.handleOpenLoginSignupDialog(LandingActions.SIGNUP_DIALOG))}
                        >
                            Sign-up
                        </Button>
                    </Grid>
                </Grid>
                <LoginSignupDialog
                    open={this.state.loginOpen}
                    onRequestClose={this.handleCloseLoginSignupDialog}
                    type={this.state.type}
                />
            </div>
        );
    }
}


class LoginSignupDialog extends Component {

    render() {
        const {classes,type,...other} = this.props;

        if(type === LandingActions.LOGIN_DIALOG){
            return (
                <Dialog
                    maxWidth="lg"
                    {...other}>
                    <Login handleDoLogin={this.handleDoLogin}/>
                </Dialog>
            );
        } else {
            return (
                <Dialog
                    maxWidth="md"
                    {...other}>
                    <SignUp />
                </Dialog>
            );
        }


    }
}

export default withStyles(styles)(LandingActions);