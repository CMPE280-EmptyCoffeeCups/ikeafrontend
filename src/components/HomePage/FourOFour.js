import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';

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

class FourOFour extends Component {

    render() {
        const {classes} = this.props;

        return (
            <Grid container justify="center">
                <Grid item xs={12} md={10}>
                        <Grid container className={classes.spinnerContainer} justify='center'>
                            <Grid item xs={12} md={8}>
                                <img alt='404' src={'/images/desktop/gen/404.jpg'}/>
                            </Grid>
                        </Grid>
                </Grid>
            </Grid>
        );
    }
}

FourOFour.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default (withStyles(styles)(FourOFour));