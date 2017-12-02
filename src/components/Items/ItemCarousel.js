import React, {Component} from 'react';
import createReactClass from 'create-react-class';
import {withStyles} from 'material-ui/styles';

import Carousel from 'nuka-carousel';

import IconButton from 'material-ui/IconButton';
import ArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import ArrowRight from 'material-ui-icons/KeyboardArrowRight';
import Grid from 'material-ui/Grid';

import Spinner from '../OtherComponents/Spinner';

const styles = theme => ({
    button: {
        margin: 1,
    }
});

class PrevButton extends Component {
    render() {
        const {classes} = this.props;

        return (
            <IconButton className={classes.button} aria-label="Delete">
                <ArrowLeft/>
            </IconButton>
        );
    }
}


class NextButton extends Component {

    render() {
        const {classes} = this.props;

        return (
            <IconButton className={classes.button} aria-label="Delete">
                <ArrowRight/>
            </IconButton>
        );
    }
}


const controlsDeco = [
    {
        component: withStyles(styles)(PrevButton),
        position: 'CenterLeft',
        style: {
            padding: 10
        }
    },
    {
        component: withStyles(styles)(NextButton),
        position: 'CenterRight'
    }
];

const ItemCarousel = createReactClass({
    mixins: [Carousel.ControllerMixin],
    handleLoaded() {
        this.setState({imageLoaded: true});
    },
    render() {

        let spinner;

        if(this.state.imageLoaded){
            spinner = '';
        } else {
            spinner = <Grid container justify="center">
                <Grid item>
                    <Spinner/>
                </Grid>
            </Grid>;
        }

        return (
            <div>
                {spinner}
                <Carousel
                    ref="carousel" data={this.setCarouselData.bind(this, 'carousel')}
                    autoplay={true}
                    decorators={controlsDeco}
                    swiping={true}
                    wrapAround={true}
                >
                    <img alt='img0'
                         src="http://res.cloudinary.com/gc51289/image/upload/v1512012664/ikea/images/other/carousel/carou0.jpg"
                         onLoad={() => this.handleLoaded()}
                    />
                    <img alt='img1'
                         src="http://res.cloudinary.com/gc51289/image/upload/v1512012664/ikea/images/other/carousel/carou1.jpg"/>
                    <img alt='img2'
                         src="http://res.cloudinary.com/gc51289/image/upload/v1512012664/ikea/images/other/carousel/carou2.jpg"/>
                    <img alt='img3'
                         src="http://res.cloudinary.com/gc51289/image/upload/v1512013627/ikea/images/other/carousel/carou3.jpg"/>

                </Carousel>

            </div>
        )
    }
});

export default ItemCarousel;


