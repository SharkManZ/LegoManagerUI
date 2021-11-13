import {Button, ButtonGroup, Grid, Link, MenuItem, Paper} from "@mui/material";
import TopBar from "./components/root/top.bar";
import {usePopupState} from "material-ui-popup-state/es/hooks";
import {bindHover, bindMenu} from "material-ui-popup-state";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import {Route, Switch, useHistory} from "react-router-dom";
import SeriesPage from "./pages/series.component";
import Home from "./pages/home.component";

function App() {
    const popupState = usePopupState({variant: 'popover', popupId: 'demoMenu'})
    const history = useHistory();
    const navigateTo = (path) => {
        history.push(path);
        popupState.close();
    }
    return (
        <div>
            <Grid container mt={8}>
                <Grid item xs={12}>
                    <TopBar/>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{p:2}}>
                        <Grid container justifyContent="center">
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button {...bindHover(popupState)}>Каталог</Button>
                                <Button>Мои наборы</Button>
                                <Button>Мои детали</Button>
                                <Button>Подбор наборов</Button>
                            </ButtonGroup>

                            <HoverMenu {...bindMenu(popupState)}
                                       anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                                       transformOrigin={{vertical: 'top', horizontal: 'left'}}>
                                <MenuItem onClick={() => navigateTo("/series")} to="/series" component={Link}>Серии</MenuItem>
                                <MenuItem onClick={popupState.close}>Наборы</MenuItem>
                                <MenuItem onClick={popupState.close}>Части</MenuItem>
                                <MenuItem onClick={popupState.close}>Цвета</MenuItem>
                            </HoverMenu>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid container mt={5}>
                    <Grid item xs={2}/>
                    <Grid item xs={8}>
                        <Paper sx={{p:1}}>
                            <Switch>
                                <Route exact path="/series" component={SeriesPage}/>
                                <Route exact path="/" component={Home}/>
                            </Switch>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}/>

                </Grid>
            </Grid>
        </div>
    );
}

export default App;
