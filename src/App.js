import React, {Component} from 'react';

import './styles/App.css';

import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import LandingPage from "./components/LandingPage/LandingPage";
import Welcome from './components/LandingPage/Welcome'

import {Route, withRouter} from 'react-router-dom';

const theme = createMuiTheme();

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <LandingPage/>
                        )}
                    />
                    <Route
                        exact
                        path="/welcome"
                        render={() => (
                            <Welcome/>
                        )}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(App);
