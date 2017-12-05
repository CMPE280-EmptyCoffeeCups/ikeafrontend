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

    constructor(props) {
        super(props);
        const {profile} = props;
        const state = profile.paymentMethods ? profile.paymentMethods[0] : {
            cardnumber: '',
            month: '',
            year: '',
            cvv: '',
            cardholdername: '',
            billingaddress: '',
        };
        state.error = {
                error: false,
                cardnumber: false,
                mm: false,
                yy: false,
                cvv: false,
                name: false,
                billadd: false
        };
        state.savebuttondisabled = true;
        this.state = state;
    }

    cc_format = (value) => {
        let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let matches = v.match(/\d{4,16}/g);
        let match = (matches && matches[0]) || '';
        let parts = [];
        for (let i=0, len=match.length; i<len; i+=4) {
            parts.push(match.substring(i, i+4))
        }
        if (parts.length) {
            return parts.join(' ')
        } else {
            return value
        }
    };

    handleChange = (changed) => (event) => {

        if(changed === 'cardnumber'){
            this.setState({
                [changed]: this.cc_format(event.target.value),
                savebuttondisabled: false
            });

            return;
        }

        this.setState({
            [changed]: event.target.value,
            savebuttondisabled: false
        });
    };

    handleSaveChanges = () => {

        const {token} = this.props;
        const {cardnumber, month, year, cvv, cardholdername, billingaddress} = this.state;

        this.setState({
            ...this.state,
            error:{
                error: false,
                cardnumber: false,
                mm: false,
                yy: false,
                cvv: false,
                name: false,
                billadd: false
            }
        });

        if(!cardnumber){
            this.setState({
                ...this.state,
                error:{
                    ...this.state.error.error,
                    error: true,
                    cardnumber: true
                }
            });
        } else if(!month){
            this.setState({
                ...this.state,
                error:{
                    ...this.state.error.error,
                    error: true,
                    mm: true
                }
            });
        } else if(!year){
            this.setState({
                ...this.state,
                error:{
                    ...this.state.error.error,
                    error: true,
                    yy: true
                }
            });
        } else if(!cardholdername){
            this.setState({
                ...this.state,
                error:{
                    ...this.state.error.error,
                    error: true,
                    name: true
                }
            });
        } else if(!cvv){
            this.setState({
                ...this.state,
                error:{
                    ...this.state.error.error,
                    error: true,
                    cvv: true
                }
            });
        } else if(!billingaddress){
            this.setState({
                ...this.state,
                error:{
                    ...this.state.error.error,
                    error: true,
                    billadd: true
                }
            });
        }


        const profile = {
            ...this.props.profile,
            paymentMethods: [{
                cardnumber,
                month,
                year,
                cvv,
                cardholdername,
                billingaddress
            }]
        };

        if(!this.state.error.error){
            this.props.saveChanges(token, profile);
            this.setState({
                savebuttondisabled : true
            });
        }

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
                                    <FormControl className={classes.formControl} error={this.state.error.cardnumber}>
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
                                    <FormControl className={classes.formControl} error={this.state.error.mm}>
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
                                    <FormControl className={classes.formControl} error={this.state.error.yy}>
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
                                    <FormControl className={classes.formControl} error={this.state.error.cvv}>
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
                                    <FormControl className={classes.formControl} error={this.state.error.name}>
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
                                    <FormControl className={classes.formControl} error={this.state.error.billadd}>
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
                                        onClick={() => this.handleSaveChanges()}
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