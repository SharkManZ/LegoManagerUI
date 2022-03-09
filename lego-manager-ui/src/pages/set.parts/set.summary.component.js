import {useParams} from "react-router-dom";
import {Card, CardMedia, Grid, Stack, Tooltip, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {LinearProgress} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {getSetSummary} from "../../service/sets.service";
import PropTypes from "prop-types";
import CenterGridItem from "../../components/cards/grid.item.component";
import Paper from "@mui/material/Paper";
import {useSelector} from "react-redux";
import {LEGO_IMG_ROOT, SET_PARTS_BRANCH} from "../../constants/pages/page.constants";
import {addDefaultImg} from "../../utils/common.funcs";

const branch = SET_PARTS_BRANCH;
const cardStyle = {
    height: "auto",
    width: "auto",
    maxHeight: 150,
    maxWidth: 200,
    objectFit: 'cover',
    margin: "auto"
};

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
        if (fetchFinished) {
            fetchData();
        }
    }, [fetchFinished]);

    function getColorsValue(data) {
        let rowArrays = data.chunk(20);
        return (
            rowArrays.map((row) => (
                <Stack key={row[0].name} direction="row" spacing={0.5} paddingBottom={1}>
                    {row.map((column) => (
                        <Box key={column.name} sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                width: 15,
                                height: 15,
                            }
                        }}>
                            <Tooltip title={column.name}>
                                <Paper style={{backgroundColor: '#' + column.hexColor}} elevation={10}/>
                            </Tooltip>
                        </Box>
                    ))
                    }
                </Stack>
            ))
        )
    }

    return (
        <Box>
            <Grid container alignItems="center" justifyContent="center">
                {loading ? (
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
                                            variant="h6">{data && data.colors ? data.colors.length : 0}</Typography>
                            </Stack>
                            {data && data.colors ?
                                getColorsValue(data.colors) : ""
                            }
                        </Stack>
                    </Paper>
                </Grid>
                <CenterGridItem xs={4}>
                    <Typography color={"deepskyblue"}
                                variant="h4">{data ? data.name + '(' + data.number + ')' : ""}</Typography>
                </CenterGridItem>
                <CenterGridItem xs={4}>
                    {data ?
                        (
                            <Card style={cardStyle}>
                                <CardMedia
                                    component="img"
                                    image={`/${LEGO_IMG_ROOT}/sets/${data.number}.png`}
                                    style={cardStyle}
                                    onError={addDefaultImg}/>
                            </Card>
                        ) : ""
                    }
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

SetSummary.propTypes = {
    setId: PropTypes.string.isRequired
}

export default SetSummary;