import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import ProfilePage from '../ProfilePage/ProfilePage';
import Checkout from '../Checkout/Checkout';

import {withStyles} from 'material-ui/styles';

import NavBar from './NavBar';
import {doAuthentication} from "../../redux/actions/userAction";
import ItemsList from "../Items/ItemsList";

const styles = theme => ({
    home: {
        marginTop: theme.spacing.unit * 8
    }
});

class HomePage extends Component {

    constructor(props){
        super(props);
        props.doAuthentication();
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <NavBar/>
                <div className={classes.home}>
                    <Route
                        exact
                        path={this.props.match.path}
                        component={ItemsList}
                    />
                    <Route
                        exact
                        path={`${this.props.match.path}/profile`}
                        render={() => {
                            if(this.props.isAuthenticated){
                                return <ProfilePage/>
                            } else {
                                return <div>You have landed on a wrong page..!!</div>
                            }
                        }}
                    />
                    <Route
                        exact
                        path={`${this.props.match.path}/checkout`}
                        render={() => {
                            if(this.props.isAuthenticated){
                                return <Checkout/>
                            } else {
                                return <div>You have landed on a wrong page..!!</div>
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {user} = state;
    return {
        isAuthenticated: user.isAuthenticated
    }
};

function mapDispatchToProps(dispatch){
    return {
        doAuthentication: () => dispatch(doAuthentication())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(HomePage)));
