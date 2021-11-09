import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import React from "react";
import {Grid, Stack} from "@mui/material";
import {NavLink} from "react-router-dom";
const drawerWidth = 0;
function TopBar() {
    return (
        <AppBar>
            <Toolbar>
                <Grid container justifyContent="center">
                    <Typography variant="h6" noWrap component="div">
                        Lego Manager
                    </Typography>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar;