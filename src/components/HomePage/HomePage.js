import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import ProfilePage from '../ProfilePage/ProfilePage';


import NavBar from './NavBar';

class HomePage extends Component {

    render() {
        return (
            <div>
                <NavBar/>
                <Route
                    exact
                    path="/home/profile"
                    render={() => (
                        <ProfilePage/>
                    )}
                />
            </div>
        );
    }
}

export default withRouter(HomePage);
