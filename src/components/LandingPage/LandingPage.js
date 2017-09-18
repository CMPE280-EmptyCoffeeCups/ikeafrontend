import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Login from "./Login";
import * as ApiClient from "../../api/ApiClient";
import Logo from "./Logo";
import Welcome from './Welcome';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: 10,
        marginRight: 20,
        backgroundImage: './images/desktop/gen/logo.svg'
    },
});

class LandingPage extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    state = {
        userLoggedIn: false,
        authError: false
    };

    handleDoLogin = (payload) => {
        ApiClient.postDoLogin(payload)
            .then((status) => {

                console.log(status);

                if(status === 200){
                    console.log("hello");
                    this.setState({
                        userLoggedIn: true
                    });
                    this.props.history.push("/welcome");
                } else if(status === 401){
                    this.setState({
                        authError: true
                    });
                }

            });
    };

    render() {
        const classes = this.props;

        return (
            <div className={classes.root}>

                <Route
                    exact
                    path="/"
                    render = {() => (
                        <div>
                            <img
                                className="landing-page-img"
                                src={'./images/desktop/gen/landing_desktop.jpg'}
                                alt="Welcome to IKEA"
                            />
                            <Logo/>
                            <Login handleDoLogin={this.handleDoLogin}/>
                        </div>
                    )}
                />

                <Route
                    exact
                    path="/welcome"
                    render = {() => (
                        <div>
                            <img
                                className="landing-page-img"
                                src={'./images/desktop/gen/landing_desktop.jpg'}
                                alt="Welcome to IKEA"
                            />
                            <Logo/>
                            <Welcome/>
                        </div>
                    )}
                />

            </div>
        )
    }
}
export default withRouter(withStyles(styles)(LandingPage));