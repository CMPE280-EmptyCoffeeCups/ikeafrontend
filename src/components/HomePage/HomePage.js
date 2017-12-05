import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';
import ProfilePage from '../ProfilePage/ProfilePage';
import Checkout from '../Checkout/Checkout';
import OrderComplete from '../Checkout/OrderComplete';
import FourOFour from './FourOFour';
import TryItBeta from './TryItBeta';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import WrongPage from './WrongPage';

import {withStyles} from 'material-ui/styles';

import NavBar from './NavBar';
import {doAuthentication, getUserProfileData} from "../../redux/actions/userAction";
import ItemsList from "../Items/ItemsList";
import {closeMessage} from "../../redux/actions/UIAction";

const styles = theme => ({
    home: {
        marginTop: theme.spacing.unit * 8
    }
});

class HomePage extends Component {

    constructor(props) {
        super(props);
        props.doAuthentication();
        if (props.isAuthenticated) {
            props.getUserProfileData(props.token, props.profile);
        }

    }

    render() {
        const {classes, message} = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={message.open}
                    onRequestClose={() => {
                        this.props.closeMessage();
                    }}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{message.message}</span>}
                    action={[
                        <Button key="undo" color="accent" dense onClick={() => {
                            this.props.closeMessage();
                        }}>
                            Okay
                        </Button>
                    ]}
                />
                <NavBar/>
                <div className={classes.home}>
                    <Switch>
                        <Route
                            exact
                            path={this.props.match.path}
                            component={ItemsList}
                        />
                        <Route
                            exact
                            path={`${this.props.match.path}/profile/`}
                            render={() => {
                                if (this.props.isAuthenticated) {
                                    return <ProfilePage/>
                                } else {
                                    return <WrongPage/>;
                                }
                            }}
                        />
                        <Route
                            exact
                            path={`${this.props.match.path}/checkout`}
                            render={() => {
                                if (this.props.isAuthenticated) {
                                    return <Checkout/>
                                } else {
                                    return <WrongPage/>;
                                }
                            }}
                        />
                        <Route
                            exact
                            path={`${this.props.match.path}/ordercomplete`}
                            render={() => {
                                if (this.props.isAuthenticated) {
                                    return <OrderComplete/>
                                } else {
                                    return <WrongPage/>;
                                }
                            }}
                        />
                        <Route
                            exact
                            path={`${this.props.match.path}/tryitbeta`}
                            render={() => {
                                return <TryItBeta/>;
                            }}
                        />
                        <Route
                            component={FourOFour}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {user, uidata} = state;
    return {
        isAuthenticated: user.isAuthenticated,
        token: user.token,
        profile: user.profile,
        message: uidata.message
    }
};

function mapDispatchToProps(dispatch) {
    return {
        doAuthentication: () => dispatch(doAuthentication()),
        getUserProfileData: (token, profile) => dispatch(getUserProfileData(token, profile)),
        closeMessage: () => dispatch(closeMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(HomePage)));
