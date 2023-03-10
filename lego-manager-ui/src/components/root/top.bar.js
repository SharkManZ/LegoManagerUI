import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import React, {useEffect, useState} from "react";
import {Grid, Stack} from "@mui/material";
import {useHistory} from "react-router-dom";
import AutocompleteControl from "../fields/autocomplete.control.component";
import {getAllUsers} from "../../service/users.service";
import {useDispatch, useSelector} from "react-redux";
import {appSlice} from "../../store/reducer/app.reducer";

function TopBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const usersNeedRefresh = useSelector(state => state.users.needRefresh);

    const navigateToHome = () => {
        history.push("/");
    }

    const fetchAllUsers = () => {
        getAllUsers()
            .then(res => {
                setUsers(res);
            })
            .catch(error => {
                dispatch(appSlice.actions.setError(error));
            })
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])

    useEffect(() => {
        fetchAllUsers();
    }, [usersNeedRefresh]);

    useEffect(() => {
        let userId = currentUser ? currentUser.id : null;
        dispatch(appSlice.actions.setUserId(userId));
    }, [currentUser])

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
                            <AutocompleteControl options={users} selectedValue={currentUser}
                                                 setOption={setCurrentUser}/>
                        </Stack>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar;