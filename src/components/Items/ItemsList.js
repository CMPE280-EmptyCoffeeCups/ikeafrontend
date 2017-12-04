import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Carousel from './ItemCarousel';
import Typography from 'material-ui/Typography';

import Item from './Item';
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

class ItemsList extends Component {
    componentDidMount(){
        this.props.getAllItems();
    }

    render() {
        const {classes, items} = this.props;

        return (
            <Grid container justify="center">

                <Grid item xs={12} md={10}>
                    <Paper className={classes.root} elevation={4}>
                        <Carousel/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={10}>
                    <Paper className={classes.root} elevation={4}>
                        <Grid container>
                            <Grid item xs={12} md={12}>
                                <Typography className={classes.title} type='title'>
                                    Showing All Products
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>

                            {
                                items.map((item) => {
                                    return (<Item
                                        key={item._id}
                                        item={item}
                                    />);
                                })
                            }

                        </Grid>
                        {
                            items.length < 1 && (
                                <Grid container justify="center" className={classes.spinnerContainer}>
                                    <Spinner/>
                                </Grid>
                            )
                        }
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

ItemsList.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    const {items} = state.items;
    const {cart} = state;

    let itemArr = [];

    for(let itemId in items){
        if(items.hasOwnProperty(itemId)){
            itemArr.push(items[itemId]);
        }
    }

    return {
        items: itemArr,
        cartArr: cart.cartItems
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllItems: () => dispatch(getAllItems()),
        //markItemsInCart: (cartArr) => dispatch(markItemsInCart(cartArr))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemsList));