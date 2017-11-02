import React, {Component} from 'react';

import './styles/App.css';

import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import LandingPage from "./components/LandingPage/LandingPage";
import Welcome from './components/LandingPage/Welcome';
import {Route, withRouter} from 'react-router-dom';
import indigo from 'material-ui/colors/indigo';
import yellow from 'material-ui/colors/yellow';
import HomePage from "./components/HomePage/HomePage";

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: {
            ...yellow,
        }
    },
    typography: {
        fontFamily: '"Raleway", sans-serif',
    },
});
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
                    <Route
                        path="/home"
                        render={() => (
                            <HomePage/>
                        )}
                    />

                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(App);
