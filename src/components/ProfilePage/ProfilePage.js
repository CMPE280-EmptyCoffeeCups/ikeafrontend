import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import Grid from 'material-ui/Grid';
import PersonalDetails from './PersonalDetails';
import PaymentDetails from './PaymentDetails';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 2,
    }),

});

function TabContainer(props) {
    return <div>{props.children}</div>;
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class ProfilePage extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid item xs={12} md={10}>
                        <AppBar position="static">
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                centered
                            >
                                <Tab label="Personal Details"/>
                                <Tab label="Payment Details"/>
                            </Tabs>
                        </AppBar>
                        {value === 0 &&
                        <TabContainer>
                            <PersonalDetails/>
                        </TabContainer>}
                        {value === 1 && <TabContainer>
                            <PaymentDetails/>
                        </TabContainer>}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePage);