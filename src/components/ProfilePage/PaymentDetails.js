import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import {updateProfile} from "../../redux/actions/userAction";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16
    }),
    title:{
        margin: 10,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
    },
    saveButton: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        width: '100%'
    },
    paylogo: {
        width: '20%',
        float: 'right'
    }
});


class PaymentDetails extends Component {

    state = {
        cardnumber: '3333 3333 3333 3333',
        month: '03',
        year: '17',
        cvv: '332',
        cardholdername: 'Gaurav Chodwadia',
        billingaddress: '201 S 4th St, Apt 523, San Jose CA 95112',
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
                            <Grid className={classes.title} item xs={12} md={12}>
                                <Grid container justify="center">
                                    <Typography type="display1" component="h3">
                                        Payment Methods
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container justify="center">
                                <Grid item xs={12} md={6}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="cardnumber">Card Number</InputLabel>
                                        <Input
                                            id="cardnumber"
                                            type={'text'}
                                            value={this.state.cardnumber}
                                            onChange={this.handleChange('cardnumber')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <img alt="v" className={classes.paylogo} src="/images/desktop/gen/payment/visa.png"/>
                                                    <img alt="m" className={classes.paylogo} src="/images/desktop/gen/payment/master.png"/>
                                                    <img alt="d" className={classes.paylogo} src="/images/desktop/gen/payment/discover.png"/>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={2} md={1}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="month">MM</InputLabel>
                                        <Input
                                            id="month"
                                            type={'text'}
                                            value={this.state.month}
                                            onChange={this.handleChange('month')}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2} md={1}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="month">YY</InputLabel>
                                        <Input
                                            id="year"
                                            type={'text'}
                                            value={this.state.year}
                                            onChange={this.handleChange('year')}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={8} md={4}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="cvv">CVV</InputLabel>
                                        <Input
                                            id="cvv"
                                            type={'password'}
                                            value={this.state.cvv}
                                            onChange={this.handleChange('cvv')}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container justify="center">
                                <Grid item xs={12} md={6}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="cardholdername">Card Holder's Name</InputLabel>
                                        <Input
                                            id="cardholdername"
                                            type={'text'}
                                            value={this.state.cardholdername}
                                            onChange={this.handleChange('cardholdername')}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container justify="center">
                                <Grid item xs={12} md={6}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="billingaddress">Billing Address</InputLabel>
                                        <Input
                                            id="billingaddress"
                                            type={'text'}
                                            value={this.state.billingaddress}
                                            onChange={this.handleChange('billingaddress')}
                                        />
                                    </FormControl>
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

PaymentDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {

    return state.user;
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveChanges: (token, profile) => dispatch(updateProfile(token, profile))
    };
};


export default (connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PaymentDetails)));