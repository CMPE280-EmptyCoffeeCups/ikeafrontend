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

            <div className="container">
                <div className="imageLayout">
                <div className="imageContainer">
                    <img src={bedroom} className="imageStyle"/>
                    <div className="textWrapper">
                        <p>Bedroom</p>
                    </div>
                </div>
                <div className="imageContainer" >
                    <img src={living_room} className="imageStyle" />
                    <div className="textWrapper">
                        <p>Living Room</p>
                    </div>
                </div>
                <div className="imageContainer">
                    <img src={kitchen}  className="imageStyle"/>
                    <div className="textWrapper">
                        <p>Kitchen</p>
                    </div>
                </div>
                <div className="imageContainer">
                    <img src={outdoor}  className="imageStyle"/>
                    <div className="textWrapper">
                        <p>Outdoor</p>
                    </div>
                </div>
                <div className="imageContainer">
                    <img src={bathroom}  className="imageStyle"/>
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