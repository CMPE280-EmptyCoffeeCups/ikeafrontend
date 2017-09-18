import React, {Component} from 'react';


class Logo extends Component {

    styles = {
        top: '1%',
        position: 'absolute',
        width: '10%',
        left: '45%',
        right: '45%'
    };

    render() {
        return (
            <div>
                <img
                    style={this.styles}
                    src={'./images/desktop/gen/logo.svg'}
                    alt="IKEA"
                />
            </div>
        );
    }
}

export default Logo;