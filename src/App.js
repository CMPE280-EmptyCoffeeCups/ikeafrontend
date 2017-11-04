import React, {Component} from 'react';

import './styles/App.css';

import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import LandingPage from "./components/LandingPage/LandingPage";
import {Route, withRouter} from 'react-router-dom';
import indigo from 'material-ui/colors/indigo';
import yellow from 'material-ui/colors/yellow';
import HomePage from "./components/HomePage/HomePage";

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: {
            ...yellow,
        },
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
                        component={LandingPage}
                    />
                    <Route
                        path="/home"
                        component={HomePage}
                    />

                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(App);
