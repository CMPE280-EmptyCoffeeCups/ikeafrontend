import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16
    }),

    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    item:{
        padding: 20
    }
});



class PurchaseHistory extends Component {


    render() {
        const {classes, orderArr} = this.props;

        let orderBody;

        if(orderArr.length > 0){
            orderBody = orderArr.map((order) => {
                return (
                    <Paper key={order.timestamp} className={classes.item}>
                        <Grid container>
                            <Grid item md={12}>
                                <Typography type='heading'>Order # {order.timestamp}</Typography>
                                <Typography>Ordered on {(new Date(order.timestamp)).toLocaleString()}</Typography>
                                <Typography>Ordered items {
                                    order.cartItems.map((item) => {
                                        return item.PRODUCT_NAME + ', '
                                    })
                                }</Typography>
                                <Typography>Total ${order.total}</Typography>

                            </Grid>
                        </Grid>
                    </Paper>
                )
            });
        } else {
            orderBody =
                <div>
                    <Typography type="display1" className={classes.cartMsg}>
                        There is no order yet..!!
                    </Typography>
                    <Typography type="body1" className={classes.cartMsg}>
                        <Link to="/home">Continue shopping.</Link>
                    </Typography>
                </div>;
        }


        return (
            <Grid container justify="center">
                <Grid item xs={12} md={12}>
                    <Paper className={classes.root} elevation={2}>
                        <Grid container justify='center' className={classes.main}>
                            <Grid item xs={12} md={12}>
                                {orderBody}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

PurchaseHistory.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const {orders} = state.cart;

    let orderArr = [];
    for(let orderid in orders){
        if(orders.hasOwnProperty(orderid)){
            orderArr.push(orders[orderid]);
        }
    }

    return {
        orderArr
    }
};



export default (connect(mapStateToProps, null)(withStyles(styles)(PurchaseHistory)));
