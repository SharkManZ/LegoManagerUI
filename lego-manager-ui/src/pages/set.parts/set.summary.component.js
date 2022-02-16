import {useParams} from "react-router-dom";
import {Grid, Stack, Tooltip, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {LinearProgress} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {getSetSummary} from "../../service/sets.service";
import PropTypes from "prop-types";
import CenterGridItem from "../../components/cards/grid.item.component";
import Paper from "@mui/material/Paper";
import {useSelector} from "react-redux";
import {SET_PARTS_BRANCH} from "../../constants/pages/page.constants";

const branch = SET_PARTS_BRANCH;
function SetSummary() {
    const {setId} = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const fetchFinished = useSelector(state => state[branch].fetchFinished);

    const fetchData = () => {
        setLoading(true);
        getSetSummary(setId).then(res => {
            setData(res);
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchFinished]);

    return (
        <Box>
            <Grid container alignItems="center" justifyContent="center">
                {loading ? (
                    <Box sx={{width: '100%'}}>
                        <LinearProgress/>
                    </Box>
                ) : null}
                <CenterGridItem xs={4}>
                    <Typography color={"goldenrod"} variant="h5">Видов
                        деталей: {data ? data.uniquePartsCount : 0}</Typography>
                </CenterGridItem>
                <CenterGridItem xs={4}>
                    <Typography color={"deepskyblue"} variant="h4">{data ? data.name : ""}</Typography>
                </CenterGridItem>
                <CenterGridItem xs={4}>
                    <Typography color={"goldenrod"} variant="h5">Деталей: {data ? data.partsCount : 0}</Typography>
                </CenterGridItem>
            </Grid>
            <Grid container alignItems="center" justifyContent="center">
                <CenterGridItem xs={12}>
                    <Typography color={"crimson"} variant="h6">Цвета</Typography>
                </CenterGridItem>
            </Grid>
            <Grid container alignItems="center" justifyContent="center">
                <Stack direction="row" spacing={1}>
                    {data ?
                        data.colors.map((item) => (
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    width: 15,
                                    height: 15,
                                }
                            }}>
                                <Tooltip title={item.name}>
                                    <Paper style={{backgroundColor: '#' + item.hexColor}} elevation={10}/>
                                </Tooltip>
                            </Box>
                        )) : ""
                    }
                </Stack>
            </Grid>
        </Box>

    )
}

SetSummary.propTypes = {
    setId: PropTypes.string.isRequired
}

export default SetSummary;