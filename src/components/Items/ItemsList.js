import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import Item from './Item';
import {getAllItems} from "../../redux/actions/itemsAction";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 2,
    }),
});

class ItemsList extends Component {

    componentDidMount(){
        this.props.getAllItems();
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid container justify="center">
                <Grid item xs={12} md={10}>
                    <Paper className={classes.root} elevation={4}>
                        <Grid container>

                            {
                                this.props.items.map((item) => {
                                    return (<Item
                                        key={item._id}
                                        item={item}
                                    />);
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


const mapStateToProps = (state) => {
    const {items} = state.items;
    return {
        items
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllItems: () => dispatch(getAllItems())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemsList));