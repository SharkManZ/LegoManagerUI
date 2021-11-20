import {Grid} from "@mui/material";
import TopBar from "./components/root/top.bar";
import MainRoute from "./components/root/main.route.component";
import MainMenu from "./components/root/main.menu.component";

function App() {
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
