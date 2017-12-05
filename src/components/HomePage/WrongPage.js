import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import {Link} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 2,
    }),
    title: {
        paddingTop: 16,
        paddingBottom: 16
    },
    spinnerContainer:{
        height: 400,
        paddingTop: 75
    }
});

class WrongPage extends Component {

    render() {
        const {classes} = this.props;

        return (
            <Grid container justify="center">
                <Grid item xs={12} md={12}>
                        <Grid container className={classes.spinnerContainer} justify='center'>
                            <Paper className={classes.root} elevation={4}>
                                <Grid container>
                                    <Grid item xs={12} md={12}>
                                        <Typography className={classes.title} type='title'>
                                            Looks like you have landed on a wrong page..!! <Link to="/home">Continue Shopping.</Link>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                </Grid>
            </Grid>
        );
    }
}

WrongPage.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default (withStyles(styles)(WrongPage));