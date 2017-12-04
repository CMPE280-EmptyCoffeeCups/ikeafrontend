import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {withRouter, Link} from 'react-router-dom';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';


const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 2,
        height: 650
    }),
    title: {
        paddingTop: 16,
        paddingBottom: 16
    },
    spinnerContainer:{
        height: 200,
        paddingTop: 75
    },
    main: {
        marginTop: 20
    },
    item: {
        marginBottom: 20,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 20,
    },
    itemimage: {
        width: '100%'
    },
    subtotal: {
        position: 'fixed',
        left: 10,
        right: 10,
        bottom: 10,
        padding: 20
    },
    confirmOrder:{
        width: '100%'
    },
    cartMsg:{
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 200
    },
    itemPrice: {
        paddingRight: 20
    },
    button: {
        marginTop: 20,
        padding: '0px 20px 0px 20px',
    },
    itemName:{
        fontSize: 15
    },
});

class OrderComplete extends Component {

    componentDidMount(){
    }

    render() {
        const {classes} = this.props;


        return (
            <Grid container justify="center">
                <Grid item xs={12} md={10}>
                    <Paper className={classes.root} elevation={4}>
                        <Typography type='display1'>
                            Thank you for your Order..!!!
                        </Typography>
                        <Typography type='body1'>
                            You can check your orders in the Purchase History on your <Link to="/home/profile/">profile page</Link>.
                        </Typography>

                        <Link to="/home/">
                            <Button
                                className={classes.button}
                                raised
                                color="primary"
                            >
                                Continue Shopping
                            </Button>
                        </Link>

                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

OrderComplete.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withRouter(withStyles(styles)(OrderComplete));