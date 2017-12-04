import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Carousel from './ItemCarousel';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import Item from './Item';
import {doSearch, getAllItems} from "../../redux/actions/itemsAction";
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
        const {classes, items, carousel, searched} = this.props;

        let carDisp = '';
        let showingFor = 'Showing All Products';
        if(carousel){
            carDisp = <Grid item xs={12} md={10}>
                <Paper className={classes.root} elevation={4}>
                    <Carousel/>
                </Paper>
            </Grid>;
        }
        if(searched !== ''){
            showingFor = `Showing results for "${searched}"`
        }



        return (
            <Grid container justify="center">

                {carDisp}
                <Grid item xs={12} md={10}>
                    <Paper className={classes.root} elevation={4}>
                        <Grid container>
                            <Grid item xs={12} md={12}>
                                <Typography className={classes.title} type='title'>
                                    {showingFor}
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
                            items.length < 1 && searched === '' && (
                                <Grid container justify="center" className={classes.spinnerContainer}>
                                    <Spinner/>
                                </Grid>
                            )
                        }
                        {
                            items.length < 1 && searched !== '' &&(
                            <Grid container justify="center" className={classes.spinnerContainer}>
                                <Typography className={classes.title} type='heading'>
                                    No results for {searched}. <Button onClick={() => {
                                        this.props.doSearch('');
                                }}>See all the products.</Button>
                                </Typography>
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
    const {items, searched} = state.items;
    const {cart} = state;

    let itemArr = [];
    let carousel = true;

    for(let itemId in items){
        if(items.hasOwnProperty(itemId)){
            itemArr.push(items[itemId]);
        }
    }

    if(searched !== ''){
        itemArr = itemArr.filter((item) => item.PRODUCT_NAME.toLowerCase().includes(searched.toLowerCase()));
        carousel = false;
    }

    return {
        items: itemArr,
        cartArr: cart.cartItems,
        carousel,
        searched
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllItems: () => dispatch(getAllItems()),
        doSearch: (searched) => dispatch(doSearch(searched))
        //markItemsInCart: (cartArr) => dispatch(markItemsInCart(cartArr))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemsList));