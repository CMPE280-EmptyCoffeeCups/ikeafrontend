import React from 'react';
import PropTypes from 'prop-types';
import bedroom from '../../images/bedroom.jpg';
import living_room from '../../images/living_room.jpg';
import kitchen from '../../images/kitchen.jpg';
import bathroom from '../../images/bathroom.jpg';
import outdoor from '../../images/outdoor.jpg';
import '../../styles/App.css';

function CenteredGrid(props) {
    return (

        <div className="container strips">
            <div className="imageLayout">
                <div className="imageContainer">
                    <img alt="bedroom" src={bedroom} className="imageStyle"/>
                    <div className="textWrapper">
                        <p>Bedroom</p>
                    </div>
                </div>
                <div className="imageContainer" >
                    <img alt="livingroom" src={living_room} className="imageStyle" />
                    <div className="textWrapper">
                        <p>Living Room</p>
                    </div>
                </div>
                <div className="imageContainer">
                    <img alt="kitchen" src={kitchen}  className="imageStyle"/>
                    <div className="textWrapper">
                        <p>Kitchen</p>
                    </div>
                </div>
                <div className="imageContainer">
                    <img alt="outdoor" src={outdoor}  className="imageStyle"/>
                    <div className="textWrapper">
                        <p>Outdoor</p>
                    </div>
                </div>
                <div className="imageContainer">
                    <img alt="bathroom" src={bathroom}  className="imageStyle"/>
                    <div className="textWrapper">
                        <p>Bathroom</p>
                    </div>
                </div>
            </div>
        </div>

    );

}
CenteredGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (CenteredGrid);