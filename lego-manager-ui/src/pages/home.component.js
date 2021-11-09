import React from "react";
import {Grid} from "@mui/material";
import TotalCard from "../components/cards/total.card.component";
import CenterGridItem from "../components/cards/grid.item.component";

function Home() {
    return (
        <Grid container direction="row">
            <CenterGridItem xs={6}>
                <TotalCard img={"/series_small.jpg"} caption="Серии наборов" totalCount={5} inStock={2}/>
            </CenterGridItem>
            <CenterGridItem xs={6}>
                <TotalCard img={"/sets_small.jpg"} caption="Наборы" totalCount={1000} inStock={10}/>
            </CenterGridItem>
            <CenterGridItem xs={12}>
                <TotalCard img={"/parts.jpg"} caption="Детали" totalCount={1000000} inStock={11000}/>
            </CenterGridItem>
        </Grid>
    );
}

export default Home;