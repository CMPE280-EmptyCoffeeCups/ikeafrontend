import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import LocalShippingIcon from 'material-ui-icons/LocalShipping';
import LocalOfferIcon from 'material-ui-icons/LocalOffer';
import PaymentIcon from 'material-ui-icons/Payment';
import OrderIcon from 'material-ui-icons/AssignmentTurnedIn';
import Button from 'material-ui/Button';


const styles = theme => ({
    root: {
        marginTop: 0,
        width: '100%',
    },
    heading: {
        marginLeft: 10,
        marginTop: 3,
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    addressField: {
        marginTop: 10,
        width: '100%'
    },
    formControl: {
        width: '100%',
        marginBottom: 10
    },
    paylogo: {
        width: '20%',
        float: 'right'
    },
    panel:{
        marginBottom: 10,
    },
    orderText:{
        float: 'right',
    },
    confirmBtn:{
        width: '100%',
        marginTop: 10
    }
});

class DeliveryPanel extends Component {
    state = {
        expanded: null,
        delAddress: this.props.user.profile.address,
        promo: '',
        paymentMehtod: this.props.user.profile.paymentMethods ? this.props.user.profile.paymentMethods[0] : {
            cardnumber: '',
            month: '',
            year: '',
            cvv: '',
            cardholdername: '',
            billingaddress: ''
        }
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes, user, subtotal } = this.props;
        const { expanded } = this.state;


        let paymentMethod;
        let cardNumber;
        let cardNumberDisp;

        if(this.state.paymentMehtod){
            paymentMethod = this.state.paymentMehtod;
            cardNumber = paymentMethod.cardnumber;
            cardNumberDisp = '************' + cardNumber.substr(cardNumber.length - 4);
        }

        let delAddressDisp = this.state.delAddress;
        let promoDisp = this.state.promo;

        let tax = (subtotal * (0.0925)).toFixed(2);
        let total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

        return (
            <div className={classes.root}>
                <ExpansionPanel className={classes.panel} expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <LocalShippingIcon/>
                        <Typography className={classes.heading}>Delivery Address</Typography>
                        <Typography className={classes.secondaryHeading}>{delAddressDisp}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <TextField
                            label="Delivery Address"
                            className={classes.addressField}
                            value={this.state.delAddress}
                            onChange={(event) => {
                                event.stopPropagation();
                                this.setState({
                                   delAddress: event.target.value
                                });
                            }}
                            onBlur={this.handleChange('panel1')}
                            margin="normal"
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.panel} expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <PaymentIcon/>
                        <Typography className={classes.heading}>Payment Details</Typography>
                        <Typography className={classes.secondaryHeading}> Credit Card ending with {cardNumberDisp}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container justify="center">
                            <Grid item xs={12} md={8}>
                                    <Grid container justify="center">

                                        <Grid container justify="center">
                                            <Grid item xs={12} md={12}>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel htmlFor="cardnumber">Card Number</InputLabel>
                                                    <Input
                                                        id="cardnumber"
                                                        type={'text'}
                                                        value={paymentMethod.cardnumber}
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
                                            <Grid item xs={2} md={2}>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel htmlFor="month">MM</InputLabel>
                                                    <Input
                                                        id="month"
                                                        type={'text'}
                                                        value={paymentMethod.month}
                                                        onChange={this.handleChange('month')}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2} md={2}>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel htmlFor="year">YY</InputLabel>
                                                    <Input
                                                        id="year"
                                                        type={'text'}
                                                        value={paymentMethod.year}
                                                        onChange={this.handleChange('year')}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={8} md={8}>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel htmlFor="cvv">CVV</InputLabel>
                                                    <Input
                                                        id="cvv"
                                                        type={'password'}
                                                        value={paymentMethod.cvv}
                                                        onChange={this.handleChange('cvv')}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                        <Grid container justify="center">
                                            <Grid item xs={12} md={12}>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel htmlFor="cardholdername">Card Holder's Name</InputLabel>
                                                    <Input
                                                        id="cardholdername"
                                                        type={'text'}
                                                        value={paymentMethod.cardholdername}
                                                        onChange={this.handleChange('cardholdername')}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                        <Grid container justify="center">
                                            <Grid item xs={12} md={12}>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel htmlFor="billingaddress">Billing Address</InputLabel>
                                                    <Input
                                                        id="billingaddress"
                                                        type={'text'}
                                                        value={paymentMethod.billingaddress}
                                                        onChange={this.handleChange('billingaddress')}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.panel} expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <LocalOfferIcon/>
                        <Typography className={classes.heading}>Promo Code</Typography>
                        <Typography className={classes.secondaryHeading}>{promoDisp}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <TextField
                            label="Promo Code"
                            className={classes.addressField}
                            value={this.state.promo}
                            onChange={(event) => {
                                event.stopPropagation();
                                this.setState({
                                    promo: event.target.value
                                });
                            }}
                            onBlur={this.handleChange('panel3')}
                            margin="normal"
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.panel} expanded={true}>
                    <ExpansionPanelSummary>
                        <OrderIcon/>
                        <Typography className={classes.heading}>Order Details</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            <Grid item xs={0} md={8}/>
                            <Grid item xs={12} md={4}>
                                <Grid container>
                                    <Grid item xs={12} md={5}>
                                        <Typography type="caption">Subtotal: </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Typography type="body1" align="right">$ {subtotal}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} md={5}>
                                        <Typography type="caption">Discount: </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Typography type="body1" align="right">$ 0.00</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} md={5}>
                                        <Typography type="caption">Delivery: </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Typography type="body1" align="right">$ 0.00</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} md={5}>
                                        <Typography type="caption">Estimated Tax: </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Typography type="body1" align="right">$ {tax}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} md={5}>
                                        <Typography type="caption">Total: </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Typography type="title" align="right">$ {total}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Button
                                        className={classes.confirmBtn}
                                        raised
                                        color="primary"
                                        onClick={() => this.handleConfirmPurchase()}
                                    >
                                        Confirm Purchase
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

DeliveryPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

const msp = (state) => {
    const {user, cart} = state;
    return {
        user,
        subtotal: cart.subtotal,
    };
};

const mdp = (dispatch) => {
    return {

    }
};

export default connect(msp, null)(withStyles(styles)(DeliveryPanel));