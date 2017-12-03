import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import EditIcon from 'material-ui-icons/Edit';
import LogoutIcon from 'material-ui-icons/PowerSettingsNew';
import {Link} from 'react-router-dom';
import {doLogout, showLogin} from "../../redux/actions/userAction";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        background: theme.palette.background.paper,
    },
});

class ProfilePop extends Component {


    handleClickLogin = () => {
        this.props.showLogin();
        this.props.handleRequestClose();
    };

    handleClickLogout = () => {
        this.props.doLogout();
        this.props.handleRequestClose();
    };

    render() {
        const {classes, isAuthenticated, profile} = this.props;

        let profilePopMenu;

        if(isAuthenticated){

            let fullName;
            if(profile.fname){
                fullName = `Hello, ${profile.fname} ${profile.lname} !`;
            } else {
                fullName = `Hello..!!`
            }


            profilePopMenu =
                <List className={classes.root}>
                    <ListItem button>
                        <ListItemText primary={fullName}/>
                    </ListItem>
                    <Link to="/home/profile">
                        <ListItem
                            button
                            onClick={() => this.props.handleRequestClose()}
                        >
                            <Avatar>
                                <EditIcon/>
                            </Avatar>
                            <ListItemText primary="Edit Profile"/>

                        </ListItem>
                    </Link>
                    <ListItem
                        button
                        onClick={() => this.handleClickLogout()}
                    >
                        <Avatar>
                            <LogoutIcon/>
                        </Avatar>
                        <ListItemText primary="Logout"/>
                    </ListItem>
                </List>;
        } else {
            profilePopMenu =
                <List className={classes.root}>
                    <ListItem
                        button
                        onClick={() => this.handleClickLogin()}
                    >
                        <Avatar>
                            <LogoutIcon/>
                        </Avatar>
                        <ListItemText primary="Login"/>
                    </ListItem>
                </List>;
        }


        return profilePopMenu;
    }


}

ProfilePop.propTypes = {
    classes: PropTypes.object.isRequired,
    handleRequestClose: PropTypes.func.isRequired
};

const mapStateToProp = (state) => {
    const {isAuthenticated, profile} = state.user;
    return {
        isAuthenticated,
        profile
    };
};

const mapDispatchToProp = (dispatch) => {
    return {
        showLogin: () => dispatch(showLogin()),
        doLogout: () => dispatch(doLogout())
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(withStyles(styles)(ProfilePop));