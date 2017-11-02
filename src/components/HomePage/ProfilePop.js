import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import EditIcon from 'material-ui-icons/Edit';
import LogoutIcon from 'material-ui-icons/PowerSettingsNew';
import {Link} from 'react-router-dom';
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        background: theme.palette.background.paper,
    },
});

class ProfilePop extends Component {

    render(){
        const { classes } = this.props;
        return (
            <List className={classes.root}>
                <Link to="/home/profile">
                    <ListItem button>

                        <Avatar>
                            <EditIcon />
                        </Avatar>
                        <ListItemText primary="Edit Profile" />

                    </ListItem>
                </Link>
                <ListItem button>
                    <Avatar>
                        <LogoutIcon />
                    </Avatar>
                    <ListItemText primary="Logout"/>
                </ListItem>
            </List>
        );
    }


}

ProfilePop.propTypes = {
    classes: PropTypes.object.isRequired,
    handleRequestClose: PropTypes.func.isRequired
};

export default withStyles(styles)(ProfilePop);