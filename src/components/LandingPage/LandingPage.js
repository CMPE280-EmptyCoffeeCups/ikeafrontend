import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Logo from "./Logo";
import '../../styles/App.css';
import LandingActions from "./LandingActions";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    video : {
        height: 'auto',
        width:'100%',
        top: 0,
        padding: 0
    }
});

class LandingPage extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <div>
                    <video className="videoTag" autoPlay loop>
                        <source src={'http://res.cloudinary.com/gc51289/video/upload/v1512182248/ikea2.mp4'} type='video/mp4'/>
                    </video>
                    <Logo/>
                    <LandingActions/>
                </div>
            </div>
        )
    }
}


export default withStyles(styles)(LandingPage);