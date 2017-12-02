import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {withRouter} from 'react-router-dom';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import {getAllItems} from "../../redux/actions/itemsAction";
import Spinner from '../OtherComponents/Spinner';

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

class Checkout extends Component {

    componentDidMount(){
    }

    render() {
        const {classes, items} = this.props;

        return (
            <Grid container justify="center">

                <Grid item xs={12} md={10}>
                    <Paper className={classes.root} elevation={4}>
                        <Typography type='display1'>
                            Checkout
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

Checkout.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    const {items} = state.items;
    return {
        items
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllItems: () => dispatch(getAllItems())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Checkout)));