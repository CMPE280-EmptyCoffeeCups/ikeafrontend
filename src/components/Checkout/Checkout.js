import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {withRouter} from 'react-router-dom';

import * as getConfig from '../../config/config';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import RemoveCart from 'material-ui-icons/RemoveShoppingCart';


import {getAllItems} from "../../redux/actions/itemsAction";
import DeliveryPanel from './DeliveryPanel';

const IMAGE_CDN = getConfig.get('prod').IMAGE_CDN;

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
        padding: '0px 20px 0px 5px',
        fontSize: 10,
        float: 'right'
    },
    itemName:{
        fontSize: 15
    },
});

class Checkout extends Component {

    componentDidMount(){
    }

    render() {
        const {classes, cartItems, user} = this.props;

        let cartBody;

        if(cartItems.length > 0){
            cartBody = cartItems.map((cartItem) => {
                return (
                    <Paper key={cartItem._id} className={classes.item}>
                        <Grid container>
                            <Grid item md={2}>
                                <img
                                    className={classes.itemimage}
                                    alt={cartItem.PRODUCT_NAME} //TODO: change this
                                    src={IMAGE_CDN + cartItem.IMAGES.main}
                                />
                            </Grid>
                            <Grid item md={7}>
                                <Typography className={classes.itemName}>{cartItem.PRODUCT_NAME}</Typography>
                                <div style={{marginTop: 10}}>
                                    Qty:
                                    <select
                                        style={{marginLeft: 5}}
                                        value={cartItem.qty}
                                        onChange={(event) => this.props.updateQtyOfCartItem(user.profile, cartItem, event.target.value)}
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                            </Grid>
                            <Grid item md={3}>
                                <Typography type="title" align="right" className={classes.itemPrice}>${cartItem.PRICE}</Typography>
                                <Button
                                    className={classes.button}
                                    dense
                                    onClick={() => this.props.removeItemFromCart(user.profile, cartItem)}
                                >
                                    Remove
                                    <RemoveCart className={classes.rightIcon}/>
                                </Button>
                            </Grid>

                        </Grid>
                    </Paper>
                )
            });
        } else {
            cartBody =
                <Typography type="display1" className={classes.cartMsg}>
                    Your Cart is Empty..!!
                </Typography>;
        }


        return (
            <Grid container justify="center">
                <Grid item xs={12} md={10}>
                    <Paper className={classes.root} elevation={4}>
                        <Typography type='display1'>
                            Checkout
                        </Typography>

                        <Grid container justify='center' className={classes.main}>
                            <Grid item xs={10} md={6}>
                                {cartBody}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DeliveryPanel/>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

Checkout.propTypes = {
    classes: PropTypes.object.isRequired,
};


const msp = (state) => {
    const {cart, user} = state;
    return {
        cartItems : cart.cartItems,
        subtotal: cart.subtotal,
        user
    };
};

const mdp = (dispatch) => {
    return {
        getAllItems: () => dispatch(getAllItems())
    }
};

export default connect(msp, mdp)(withRouter(withStyles(styles)(Checkout)));