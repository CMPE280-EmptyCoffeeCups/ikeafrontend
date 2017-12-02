import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import AddToCart from 'material-ui-icons/AddShoppingCart';
import DoneAll from 'material-ui-icons/DoneAll';

import Spinner from '../OtherComponents/Spinner';
import {addItemToCart} from "../../redux/actions/cartAction";

import {API} from '../../api/ApiClient';

const styles = theme => ({
    card: {
        maxWidth: 400
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    price: {
        paddingTop: 0,
        paddingBottom: 0
    },
    header: {
        paddingTop: 8,
        paddingBottom: 8
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    button: {
        width: '100%'
    },
    addedbutton: {
        width: '100%',
        backgroundColor: '#81C784'
    }
});

class Item extends React.Component {
    state = {
        expanded: false,
        imageLoaded: false
    };

    handleExpandClick = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    };

    handleAddToCart = (profile, item) => {
        this.props.addItemToCart(profile, item);
    };

    handleImageLoaded(){
        this.setState({
            imageLoaded: true
        });
    }

    render() {
        const { classes, item, user } = this.props;

        const name = item.PRODUCT_NAME.split(/,(.+)/);
        const title = name[0];
        const subheader = name[1];

        let cardMedia;
        if(this.state.imageLoaded){
            cardMedia = '';
        } else {
            cardMedia = <Grid container justify="center">
                <Grid item>
                    <Spinner/>
                </Grid>
            </Grid>;
        }

        let cartBtn;
        if(item.incart) {
            cartBtn = <Button
                className={classes.addedbutton}
                raised
                onClick={() => (null)}
            >
                Added To Cart
                <DoneAll className={classes.rightIcon} />
            </Button>

        } else {
            cartBtn = <Button
                className={classes.button}
                raised
                color="primary"
                onClick={() => (this.handleAddToCart(user.profile, Object.assign({}, item)))}

            >
                Add To Cart
                <AddToCart className={classes.rightIcon} />
            </Button>
        }


        return (
            <Grid item xs={6} sm={6} md={3}>
                <Card className={classes.card}>
                    {cardMedia}
                    <CardMedia
                        component="img"
                        image={`${API}/static${item.IMAGES.main}`}
                        title={`${title} ${subheader}`}
                        onLoad={() => this.handleImageLoaded()}
                    />
                    <CardHeader
                        className={classes.header}
                        title={title}
                        subheader={subheader}
                    />
                    <CardHeader
                        className={classes.price}
                        title={`$${item.PRICE}`}
                    />
                    <CardContent className={classes.content}>
                        {cartBtn}
                    </CardContent>
                    <CardActions disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="Share">
                            <ShareIcon />
                        </IconButton>
                        <div className={classes.flexGrow} />
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                        <CardContent>
                            <Typography component="p">
                                {item.PRODUCT_DESCRIPTION}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        );
    }
}

Item.propTypes = {
    classes: PropTypes.object.isRequired,
};

const msp = (state) => {
    return {
        user: state.user
    }
};

const mdp = (dispatch) => {
    return {
        addItemToCart: (profile, item) => dispatch(addItemToCart(profile, item))
    }
};

export default connect(msp, mdp)(withStyles(styles)(Item));