import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { findDOMNode } from 'react-dom';

import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Avatar from 'material-ui/Avatar';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';
import Input from 'material-ui/Input';
import Popover from 'material-ui/Popover';

import ProfilePop from './ProfilePop';

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

    state = {
        open: false,
        anchorEl: null
    };


    handleClickButton = (event) => {
        this.setState({
            open: true,
            anchorEl: findDOMNode(event.target),
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    componentDidMount(){
    }

    render() {
        const {
            open,
            anchorEl,
        } = this.state;
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
                                    src={'/images/desktop/gen/logo.svg'}
                                    alt="IKEA"
                                />
                            </Link>
                        </Typography>
                        <Input
                            
                        />
                        <IconButton>
                            <ShoppingCartIcon/>
                        </IconButton>
                        <IconButton
                            onClick={(event) => this.handleClickButton(event)}
                        >
                            <Avatar
                                alt="First Last"
                                src="/images/desktop/gen/default_avatar.png"
                            />
                        </IconButton>
                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onRequestClose={this.handleRequestClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <ProfilePop handleRequestClose={this.handleRequestClose}/>
                        </Popover>
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