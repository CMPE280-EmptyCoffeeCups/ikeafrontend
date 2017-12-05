import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { findDOMNode } from 'react-dom';

import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import SearchIcon from 'material-ui-icons/Search';

import ProfilePop from './ProfilePop';
import Cart from './Cart';
import SearchBar from './SearchBar';

const styles = theme => ({
    root: {
        width: '100%',
        position: 'fixed',
        top: 0,
        zIndex: 1000
    },
    searchcontainer:{
        flex: 1,
    },
    toolBar:{
        backgroundColor: '#fcd53e'
    },
    flex: {
        flex: 0,
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
    badge: {
        margin: `0 ${theme.spacing.unit * 3}px`,
    },
});


class NavBar extends Component {

    state = {
        open: false,
        searchOpen: false,
        anchorEl: null
    };


    handleClickProfileButton = (event) => {
        this.setState({
            open: true,
            anchorEl: findDOMNode(event.target),
        });
    };

    handleClickSearchButton = () => {
        let searchOpen = !this.state.searchOpen;
        this.setState({
            searchOpen: searchOpen,
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
                        <Typography type="title" color="inherit">
                            <Link to="/home">
                                <img
                                    className={classes.logo}
                                    src={'/images/desktop/gen/logo.svg'}
                                    alt="IKEA"
                                />
                            </Link>
                        </Typography>
                        {/*<Typography type="body1" color="inherit" className={classes.flex}>*/}
                            {/*<Link to="/home/tryitbeta">*/}
                                {/*Try It! Beta*/}
                            {/*</Link>*/}
                        {/*</Typography>*/}
                        <div className={classes.searchcontainer}>
                            {this.state.searchOpen ? <SearchBar/> : ''}
                        </div>
                        <IconButton
                            onClick={(event) => this.handleClickSearchButton()}
                        >
                            <SearchIcon/>
                        </IconButton>
                        <Cart/>
                        <IconButton
                            onClick={(event) => this.handleClickProfileButton(event)}
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