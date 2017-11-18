import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Badge from 'material-ui/Badge';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import RemoveCart from 'material-ui-icons/RemoveShoppingCart';

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

    render() {
        const {classes} = this.props;


        return (
            <div>
                <IconButton className={classes.cartbutton} onClick={this.toggleDrawer('right', true)}>
                    <Badge badgeContent={4} color="primary">
                        <ShoppingCartIcon/>
                    </Badge>
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
                                    <Badge badgeContent={4} color="primary">
                                        <ShoppingCartIcon/>
                                    </Badge>
                                </IconButton>
                                <Typography type="headline" gutterBottom>Your Shopping Cart</Typography>
                            </Grid>
                        </Paper>


                        {/*Items List */}
                        <Paper className={classes.item}>
                            <Grid container md={12}>
                                <Grid item md={3}>
                                    <img
                                        className={classes.itemimage}
                                        alt={"Item Name"} //TODO: change this
                                        src={'http://localhost:3001/static/images/product/coffeetables/IKEA_PS_2017_main.jpg'}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <Typography type="title">IKEA PS 2017</Typography>
                                    <Typography>Side table/stool, beech</Typography>
                                    <div style={{marginTop: 10}}>
                                        Qty:
                                        <select style={{marginLeft: 5}}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </div>
                                </Grid>
                                <Grid item md={3}>
                                    <Typography type="title" align="right">$589</Typography>
                                    <Button className={classes.button} dense>
                                        Remove
                                        <RemoveCart className={classes.rightIcon}/>
                                    </Button>
                                </Grid>

                            </Grid>
                        </Paper>

                        <Paper className={classes.subtotal}>
                            <Grid container>
                                <Grid item md={6}>
                                    <Typography type="title">Subtotal</Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography type="title" align="right">$589</Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <hr/>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item md={9}>
                                    <Button raised color="primary" className={classes.checkoutbutton}>
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

export default withStyles(styles)(Cart);