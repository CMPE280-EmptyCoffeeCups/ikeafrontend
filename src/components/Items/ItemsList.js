import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import Item from './Item';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 2,
    }),
});

class ItemsList extends Component {

    render() {
        const {classes} = this.props;
        const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        return (
            <Grid container justify="center">
                <Grid item xs={12} md={10}>
                    <Paper className={classes.root} elevation={4}>
                        <Grid container>

                            {
                                items.map((item) => {
                                    return (<Item key={item}/>);
                                })
                            }

                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

ItemsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemsList);