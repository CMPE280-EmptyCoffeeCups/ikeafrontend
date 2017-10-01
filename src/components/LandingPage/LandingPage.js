import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import * as ApiClient from "../../api/ApiClient";


import ikea2 from './ikea2.mp4';

import Logo from "./Logo";
import LandingActions from "./LandingActions";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    video : {
        height: 'auto',
        width:'100%',
        top: 0,
        padding: 0,
        position: 'absolute'
    }
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

                if (status === 200) {
                    console.log("hello");
                    this.setState({
                        userLoggedIn: true
                    });
                    this.props.history.push("/welcome");
                } else if (status === 401) {
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
                <div>
                    <video className="videoTag" autoPlay loop>
                        <source src={ikea2} type='video/mp4'/>
                    </video>
                    <Logo/>
                    <LandingActions/>
                    {/*<Login handleDoLogin={this.handleDoLogin}/>*/}
                    {/*<SignUp/>*/}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(LandingPage);