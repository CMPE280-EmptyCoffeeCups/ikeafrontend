import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        position: 'absolute'
    },
    logo: {
        marginTop : 3
    }
});

class Logo extends Component {

    render() {
        const classes = this.props.classes;

        return (
            <div>
                <div className={classes.root}>
                    <Grid container justify="center">
                        <Grid item md={1} sm={5} xs={5}>
                            <img
                                className={classes.logo}
                                src={'./images/desktop/gen/logo.svg'}
                                alt="IKEA"
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Logo);