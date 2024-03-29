import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import TopBar from "./components/root/top.bar";
import MainRoute from "./components/root/main.route.component";
import MainMenu from "./components/root/main.menu.component";
import {useSnackbar} from "notistack";
import {useDispatch, useSelector} from "react-redux";
import {appSlice} from "./store/reducer/app.reducer";

function App() {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const msg = useSelector(state => state.app.msg);
    const msgType = useSelector(state => state.app.msgType);

    useEffect(() => {
        if (!msg) {
            return;
        }
        enqueueSnackbar(msg, {variant: msgType});
        dispatch(appSlice.actions.clearMsg());
    }, [msg])

    return (
        <div>
            <Grid container mt={8}>
                <Grid item xs={12}>
                    <TopBar/>
                </Grid>
                <Grid item xs={12}>
                    <MainMenu/>
                </Grid>
                <Grid container mt={3}>
                    <Grid item xs={2}/>
                    <Grid item xs={8}>
                        <MainRoute/>
                    </Grid>
                    <Grid item xs={2}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
