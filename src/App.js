import React, {Component} from 'react';

import './styles/App.css';

import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import LandingPage from "./components/LandingPage/LandingPage";
import Welcome from './components/LandingPage/Welcome';
import {Route, withRouter} from 'react-router-dom';
import indigo from 'material-ui/colors/indigo';
import yellow from 'material-ui/colors/yellow';

const theme = createMuiTheme({
    palette: {
        primary: indigo, // Purple and green play nicely together.
        secondary: {
            ...yellow,
        }
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

                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(App);
