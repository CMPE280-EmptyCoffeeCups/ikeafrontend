import React from 'react';
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

import {API} from '../../api/ApiClient';

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 200,
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
    }
});

class Item extends React.Component {
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    render() {
        const { classes, item } = this.props;

        const name = item.PRODUCT_NAME.split(/,(.+)/);
        const title = name[0];
        const subheader = name[1];

        return (
            <Grid item xs={6} md={3}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={`${API}/static${item.IMAGES.main}`}
                        title="NORDLI bed"
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
                    <CardContent>
                        <Typography component="p">
                            {item.PRODUCT_DESCRIPTION}
                        </Typography>
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


export default withStyles(styles)(Item);