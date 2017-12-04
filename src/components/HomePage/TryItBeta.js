import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
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
        height: 200,
        paddingTop: 75
    }
});

class TryItBeta extends Component {

    render() {
        const {classes} = this.props;

        return (
            <Grid container justify="center">
                <Grid item xs={12} md={10}>
                    <Paper className={classes.root} elevation={4}>
                        <Grid container>
                            <Grid item xs={12} md={12}>
                                <Typography className={classes.title} type='title'>
                                    Try It Beta
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

TryItBeta.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default (withStyles(styles)(TryItBeta));