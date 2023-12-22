import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import React, {useEffect, useState} from "react";
import {Grid, Stack} from "@mui/material";
import {useHistory} from "react-router-dom";
import AutocompleteControl from "../fields/autocomplete.control.component";
import {useDispatch} from "react-redux";
import {appSlice} from "../../store/reducer/app.reducer";
import {userApi} from "../../api/user.api";

function TopBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState();
    const {data: users} = userApi.useGetAllUsersListQuery();

    const selectUser = (value) => {
        let userId = value ? value.id : null;
        dispatch(appSlice.actions.setUserId(userId));
    }

    const navigateToHome = () => {
        history.push("/");
    }

    useEffect(() => {
        //console.log('users changed');
        //setCurrentUser({});
    }, [users])

    return (
        <AppBar>
            <Toolbar>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={3}/>
                    <Grid item container xs={6} justifyContent="center" alignItems="center">
                        <img src="/logo.png" alt="Логотип" onClick={navigateToHome}/>
                        <Typography variant="h6" noWrap component="div">
                            Lego Manager
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Stack direction="row" spacing={1}>
                            <Typography width="100px" variant="h7" noWrap margin="auto">Владелец</Typography>
                            <AutocompleteControl options={users ? users : []} selectedValue={currentUser}
                                                 setOption={selectUser}/>
                        </Stack>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar;