import React from "react";
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {Grid, Stack, Typography} from "@mui/material";
import {LinearProgress} from "@material-ui/core";
import Paper from "@mui/material/Paper";
import CenterGridItem from "../../components/cards/grid.item.component";
import {userApi} from "../../api/user.api";

function UserSetsSummary() {
    const userId = useSelector(state => state.app.userId);
    const {data, isLoading} = userApi.useGetUserSetsSummaryQuery(userId);

    return (
        <Box>
            <Grid container alignItems="center" justifyContent="center">
                {isLoading ? (
                    <Box sx={{width: '100%'}}>
                        <LinearProgress/>
                    </Box>
                ) : null}
                <Grid item xs={4}>
                    <Paper>
                        <Stack direction="column" ml={2} mr={2}>
                            <Stack direction="row">
                                <Typography color={"goldenrod"} variant="h6" style={{width: '100%'}}>Видов
                                    деталей:</Typography>
                                <Typography align="right" color={"goldenrod"}
                                            variant="h6">{data ? data.uniquePartsCount : 0}</Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography color={"goldenrod"} variant="h6" style={{width: '100%'}}>
                                    Деталей</Typography>
                                <Typography color={"goldenrod"}
                                            variant="h6">{data ? data.partsCount : 0}</Typography>
                            </Stack>
                            <Stack direction="row">
                                <Typography color={"goldenrod"} variant="h6" style={{width: '100%'}}>
                                    Цветов</Typography>
                                <Typography color={"goldenrod"}
                                            variant="h6">{data ? data.colorsCount : 0}</Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
                <CenterGridItem xs={4}>
                    <Typography color={"deepskyblue"}
                                variant="h4">Наборы владельца</Typography>
                </CenterGridItem>
                <CenterGridItem xs={4}>
                </CenterGridItem>
            </Grid>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item={1}/>
                <CenterGridItem xs={11}>

                </CenterGridItem>
            </Grid>
            <Grid container alignItems="center" justifyContent="center">

            </Grid>
        </Box>

    )
}

export default UserSetsSummary;