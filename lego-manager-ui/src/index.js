import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {SnackbarProvider} from "notistack";
import {Slide} from "@material-ui/core";
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFCF00'
        }
    },
    typography: {
        button: {
            fontWeight:"bold"
        }
    }
});

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            TransitionComponent={Slide}>
            <ThemeProvider theme={theme}>
                <Router>
                    <App/>
                </Router>
            </ThemeProvider>
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
);