import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import {deleteProfile, getUserProfileData, updateProfile} from "../../redux/actions/userAction";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16
    }),
    bigAvatar: {
        width: '30%',
        height: '100%'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: '100%',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    uploadButton: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    saveButton: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        width: '100%'
    },
    deleteButton: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        width: '100%',
        backgroundColor: '#ff7e77'
    }
});

class AlertDialog extends Component {
    state = {
        open: false,
    };

    handleRequestClose = (doDelete) => {
        this.setState({ open: false });
        if(doDelete){
            const { token, email } = this.props;
            this.props.deleteProfile(token, email);
        }
    };

    handleRequestOpen = () => {
        this.setState({open: true});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button
                    raised
                    className={classes.deleteButton}
                    onClick={() => this.handleRequestOpen()}
                >
                    Delete Account
                </Button>
                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>{"Do you want to delete your account?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This will delete your account and all your information, including payment details,  from IKEA website.
                            You can always come back just by logging in, and your account will be activated.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleRequestClose(false)} color="primary">
                            No
                        </Button>
                        <Button onClick={() => this.handleRequestClose(true)} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
const WrappedAlertDialog = connect(
    (state) => {
        const {user} = state;
        return {
            token: user.token,
            email: user.profile.email
        }
    },
    (dispatch) => {
        return{
            deleteProfile: (token, email) => dispatch(deleteProfile(token, email))
        }
    }
)(withStyles(styles)(AlertDialog));


class PersonalDetails extends Component {


    constructor(props) {
        super(props);
        const {profile} = props;
        this.state = {
            fname: profile.fname,
            lname: profile.lname,
            address: profile.address,
            email: profile.email,
            savebuttondisabled: true
        };
    }

    componentDidMount() {
        const { token, profile } = this.props;
        this.props.getUserProfileData(token, profile);
    }

    handleChange = (changed) => (event) => {
        this.setState({
            [changed]: event.target.value,
            savebuttondisabled: false
        });
    };

    handleSaveChanges = () => {
        const {token} = this.props;
        const {fname, lname, email, address} = this.state;
        const profile = {
            ...this.props.profile,
            fname,
            lname,
            email,
            address
        };
        this.props.saveChanges(token, profile);
        this.setState({
            savebuttondisabled : true
        });
    };

    render() {
        const {classes} = this.props;
        const {savebuttondisabled} = this.state;
        return (
            <Grid container justify="center">
                <Grid item xs={12} md={12}>
                    <Paper className={classes.root} elevation={2}>
                        <Grid container justify="center">
                            <Grid item xs={12} md={12}>
                                <Grid container justify="center">
                                    <Typography type="display1" component="h3">
                                        Your Profile
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item md={3}/>
                            <Grid item xs={12} md={6} >
                                <Grid container justify="center">
                                    <Avatar
                                        alt="GC"
                                        src="/images/desktop/gen/default_avatar.png"
                                        className={classes.bigAvatar}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item md={3}/>
                            <Grid item md={3}/>
                            <Grid container justify="center">
                                <input accept="jpg,jpeg,JPG,JPEG" className={classes.input} id="file" type="file" />
                                <label htmlFor="file">
                                    <Button raised component="span" className={classes.uploadButton}>
                                        Change Picture
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item md={3}/>

                            <Grid container justify="center">
                                    <Grid item xs={12} md={4}>
                                            <TextField
                                                id="fname"
                                                label="First Name"
                                                className={classes.textField}
                                                value={this.state.fname}
                                                onChange={this.handleChange('fname')}
                                                margin="normal"
                                            />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                            <TextField
                                                id="lname"
                                                label="Last Name"
                                                className={classes.textField}
                                                value={this.state.lname}
                                                onChange={this.handleChange('lname')}
                                                margin="normal"
                                            />
                                    </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        id="emailid"
                                        label="Email ID"
                                        className={classes.textField}
                                        value={this.state.email}
                                        disabled
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        id="address"
                                        label="Address"
                                        className={classes.textField}
                                        value={this.state.address}
                                        onChange={this.handleChange('address')}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} md={4}>
                                    <Button
                                        raised
                                        color="primary"
                                        className={classes.saveButton}
                                        disabled={savebuttondisabled}
                                        onClick={() => this.handleSaveChanges()}
                                    >
                                        Save Changes
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} md={12}>
                                    <Divider/>
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} md={4}>
                                    <WrappedAlertDialog/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

PersonalDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {

    return state.user;
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfileData: (token, profile) => dispatch(getUserProfileData(token, profile)),
        saveChanges:         (token, profile) => dispatch(updateProfile(token, profile))
    };
};


export default (connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PersonalDetails)));
