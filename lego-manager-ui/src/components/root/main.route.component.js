import {Route, Switch} from "react-router-dom";
import SeriesPage from "../../pages/series.component";
import SetsPage from "../../pages/sets/sets.component";
import Home from "../../pages/home.component";
import {Paper} from "@mui/material";
import ColorsPage from "../../pages/colors/colors.component";
import PartCategoriesPage from "../../pages/part.categories/part.categories.component";
import PartsPage from "../../pages/parts/parts.component";
import SetPartsPage from "../../pages/set.parts/set.parts.page.component";

function MainRoute() {
    return (
        <Paper sx={{p: 1}}>
            <Switch>
                <Route exact path="/series" component={SeriesPage}/>
                <Route exact path="/sets" component={SetsPage}/>
                <Route exact path="/sets/:seriesId" component={SetsPage}/>
                <Route exact path="/partCategories" component={PartCategoriesPage}/>
                <Route exact path="/parts" component={PartsPage}/>
                <Route exact path="/parts/:categoryId" component={PartsPage}/>
                <Route exact path="/set/:setId/parts" component={SetPartsPage}/>
                <Route exact path="/colors" component={ColorsPage}/>
                <Route exact path="/" component={Home}/>
            </Switch>
        </Paper>
    )
}

export default MainRoute;