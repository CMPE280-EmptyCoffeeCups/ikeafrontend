import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Avatar from 'material-ui/Avatar';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';
import Input from 'material-ui/Input';

import * as API from '../../api/ApiClient';

const styles = theme => ({
    root: {
        width: '100%'
    },
    toolBar:{
        backgroundColor: '#fcd53e'
    },
    flex: {
        flex: 1,
    },
    logo: {
        width: 120,
        marginTop : 3
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
});


class NavBar extends Component {

    componentDidMount(){
        API.postAuthUser()
            .then((resJSON) => {
                console.log(resJSON);
            });

        API.getItems()
            .then((resJSON) => {
                console.log(resJSON);
            });
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar className={classes.toolBar}>
                        <IconButton className={classes.menuButton}>
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            <Link to="/home">
                                <img
                                    className={classes.logo}
                                    src={'./images/desktop/gen/logo.svg'}
                                    alt="IKEA"
                                />
                            </Link>
                        </Typography>
                        <Input
                            
                        />
                        <IconButton>
                            <ShoppingCartIcon/>
                        </IconButton>
                        <IconButton>
                            <Avatar
                                alt="First Last"
                                src="./images/desktop/gen/default_avatar.png"
                            />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);