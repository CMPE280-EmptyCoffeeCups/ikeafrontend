import React, {Component} from 'react';
import PropTypes from "prop-types";

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: 32,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        top: '30%',
        width: '25%',
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    }
});

class Login extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired
    };


    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.root}>
                <Grid container justify="center">
                    <Paper className={classes.paper} elevation={20}>
                        <Typography type="display3" gutterBottom>
                            Welcome to IKEA
                        </Typography>
                        <Typography type="display1" gutterBottom>
                            ... More features to come...
                        </Typography>
                    </Paper>
                </Grid>
            </div>

        );
    }
}

export default withStyles(styles)(Login);