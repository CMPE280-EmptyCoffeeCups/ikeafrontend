import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {withRouter} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import Badge from 'material-ui/Badge';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import RemoveCart from 'material-ui-icons/RemoveShoppingCart';

import * as getConfig from '../../config/config';
import {initCart, removeItemFromCart, updateQtyOfCartItem} from "../../redux/actions/cartAction";

const IMAGE_CDN = getConfig.get('prod').IMAGE_CDN;

const styles = theme => ({
    cartbutton: {
        marginTop: 10,
        marginRight: 10
    },
    cartbutton1: {
        marginLeft: 10,
        marginRight: 10
    },
    cartwrapper: {
        width: 400
    },
    title: {
        marginTop: 1,
        paddingTop: 20,
        height: 43,
        backgroundColor: '#fcd53e'
    },
    item: {
        margin: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 20,
    },
    itemimage: {
        width: '100%'
    },
    button: {
        marginTop: 20,
        padding: '0px 2px 0px 5px',
        fontSize: 10,
        float: 'right'
    },
    rightIcon: {
        height: 13,
    },
    subtotal: {
        position: 'fixed',
        left: 10,
        right: 10,
        bottom: 10,
        padding: 20
    },
    checkoutbutton:{
        width: '100%'
    },
    cartMsg:{
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 100
    }

});

class Cart extends React.Component {
    state = {
        right: false, //TODO: make this true for dev
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    handleCheckout = () => {
        this.toggleDrawer('right', false).call();
        this.props.history.push('/home/checkout');
    };

    componentDidMount(){
        this.props.initCart(this.props.user.profile);
    }

    render() {
        const {classes, cartItems, subtotal, user} = this.props;

        let badge;
        let cartBody;

        if(cartItems.length > 0){
            badge = <Badge badgeContent={cartItems.length} color="primary">
                        <ShoppingCartIcon/>
                    </Badge>;


            cartBody = cartItems.map((cartItem) => {
                return (
                    <Paper key={cartItem._id} className={classes.item}>
                        <Grid container>
                            <Grid item md={3}>
                                <img
                                    className={classes.itemimage}
                                    alt={cartItem.PRODUCT_NAME} //TODO: change this
                                    src={IMAGE_CDN + cartItem.IMAGES.main}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Typography>{cartItem.PRODUCT_NAME}</Typography>
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
                                <Typography type="title" align="right">${cartItem.PRICE}</Typography>
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
            badge = <ShoppingCartIcon/>;
            cartBody =
                <Typography type="display1" className={classes.cartMsg}>
                    Your Cart is Empty..!!
                </Typography>;
        }

        return (
            <div>
                <IconButton className={classes.cartbutton} onClick={this.toggleDrawer('right', true)}>
                    {badge}
                </IconButton>

                <Drawer
                    anchor="right"
                    open={this.state.right}
                    onRequestClose={this.toggleDrawer('right', false)}
                >
                    <div className={classes.cartwrapper}>
                        <Paper className={classes.title}>
                            <Grid container>
                                <IconButton className={classes.cartbutton1} onClick={this.toggleDrawer('right', true)}>
                                    {badge}
                                </IconButton>
                                <Typography type="headline" gutterBottom>Your Shopping Cart</Typography>
                            </Grid>
                        </Paper>


                        {/*Items List */}
                        { cartBody }


                        <Paper className={classes.subtotal}>
                            <Grid container>
                                <Grid item md={6}>
                                    <Typography type="title">Subtotal</Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography type="title" align="right">${subtotal}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <hr/>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item md={9}>
                                    <Button
                                        raised
                                        color="primary"
                                        className={classes.checkoutbutton}
                                        onClick={() => this.handleCheckout()}
                                    >
                                        Check Out
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Drawer>

            </div>
        );
    }
}

Cart.propTypes = {
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
        removeItemFromCart: (profile, item) => dispatch(removeItemFromCart(profile, item)),
        updateQtyOfCartItem: (profile, item, qty) => dispatch(updateQtyOfCartItem(profile, item, qty)),
        initCart: (profile) => dispatch(initCart(profile))
    }
};

export default connect(msp, mdp)(withRouter(withStyles(styles)(Cart)));