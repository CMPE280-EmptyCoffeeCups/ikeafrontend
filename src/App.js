import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import './styles/App.css';

import { MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import LandingPage from "./components/LandingPage/LandingPage";

const theme = createMuiTheme();

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <LandingPage/>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

export default App;
