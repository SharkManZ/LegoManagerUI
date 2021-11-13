import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import TotalCard from "../components/cards/total.card.component";
import CenterGridItem from "../components/cards/grid.item.component";
import {getTotals} from "../service/total.service";
import {useSnackbar} from "notistack";

const emptyTotals = {
    series: {total: 0, inStock: 0},
    sets: {total: 0, inStock: 0},
    diffParts: {total: 0, inStock: 0},
    parts: {total: 0, inStock: 0}
}

function Home() {
    const {enqueueSnackbar} = useSnackbar();
    const [totals, setTotals] = useState(emptyTotals);
    useEffect(() => {
        getTotals({enqueueSnackbar, emptyTotals}).then(res => {
            if (res == null) {
                enqueueSnackbar('Отсутствуют данные для отображения.', {variant:'error'});
                return;
            }

            setTotals(res);
        });
    }, []);

    return (
        <Grid container direction="row">
            <CenterGridItem xs={6}>
                <TotalCard img={"/series_small.jpg"} caption="Серии наборов"
                           totalCount={totals.series.total} inStock={totals.series.inStock}/>
            </CenterGridItem>
            <CenterGridItem xs={6}>
                <TotalCard img={"/sets_small.jpg"} caption="Наборы"
                           totalCount={totals.sets.total} inStock={totals.sets.inStock}/>
            </CenterGridItem>
            <CenterGridItem xs={6}>
                <TotalCard img={"/diff_parts.png"} caption="Виды деталей"
                           totalCount={totals.diffParts.total} inStock={totals.diffParts.inStock}/>
            </CenterGridItem>
            <CenterGridItem xs={6}>
                <TotalCard img={"/parts.png"} caption="Детали"
                           totalCount={totals.parts.total} inStock={totals.parts.inStock}/>
            </CenterGridItem>
        </Grid>
    );
}

export default Home;