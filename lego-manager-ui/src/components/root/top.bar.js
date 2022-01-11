import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import React from "react";
import {Grid} from "@mui/material";
import {useHistory} from "react-router-dom";

function TopBar() {
    const history = useHistory();
    const navigateToHome = () => {
        history.push("/");
    }

    return (
        <AppBar>
            <Toolbar>
                <Grid container justifyContent="center" alignItems="center">
                    <img src="/logo.png" alt="Логотип" onClick={navigateToHome}/>
                    <Typography variant="h6" noWrap component="div">
                        Lego Manager
                    </Typography>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar;