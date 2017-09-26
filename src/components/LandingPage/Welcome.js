import React, {Component} from 'react';
import PropTypes from "prop-types";

import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    }
});

class Welcome extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired
    };


    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.root}>
                welcome
            </div>

        );
    }
}

export default withStyles(styles)(Welcome);