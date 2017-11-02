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
    }
});


class PersonalDetails extends Component {

    state = {
        fname: 'Gaurav',
        lname: 'Chodwadia',
        address: '201 S 4th St, Apt 523, San Jose CA 95112',
        emailid: 'gauravchodwadia@gmail.com',
        savebuttondisabled: true
    };

    handleChange = (changed) => (event) => {
        this.setState({
            [changed]: event.target.value,
            savebuttondisabled: false
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
                                        value={this.state.emailid}
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
                                    >
                                        Save Changes
                                    </Button>
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

// const mapStateToProps = (state) => {
//
//     let { posts, sortBy } = state.postData;
//
//     let postsArr = Object.keys(posts).map((postId) => {
//         return posts[postId];
//     });
//
//     let sortedPosts = postsArr.sort((a, b) => {
//         if(sortBy === 'time'){
//             return b.timestamp - a.timestamp;
//         } else {
//             return b.voteScore - a.voteScore;
//         }
//     });
//
//     return {
//         posts : sortedPosts
//     };
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchPostsData: (category) => dispatch(getAllPostData(category))
//     };
// };


export default (connect(null, null)(withStyles(styles)(PersonalDetails)));