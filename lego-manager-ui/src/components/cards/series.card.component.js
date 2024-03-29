import React from 'react';
import {Box, Card, CardContent, CardMedia, Grid, IconButton, Stack, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {makeStyles} from "@mui/styles";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {LEGO_IMG_ROOT} from "../../constants/pages/page.constants";
import PropTypes from "prop-types";
import {addDefaultImg} from "../../utils/common.funcs";

const useStyles = makeStyles({
    root: {
        height: 150,
        width: '100%',
        transformOrigin: "scale(1)",
        transition: "transform .5s, visibility .5s ease-in"
    },
    cardHovered: {
        height: 150,
        width: '100%',
        transition: "transform .5s, visibility .5s ease-in",
        transform: "scale(1.1)"
    }
});

function SeriesCard({item, onEdit, onDelete}) {
    const classes = useStyles();
    const [cardZoom, setCardZoom] = useState(false);
    const history = useHistory();

    const changeCardZoom = (value) => {
        setCardZoom(value);
    }

    const editClick = () => {
        onEdit(item);
    }

    const deleteClick = () => {
        onDelete(item.id);
    }

    const onCardClick = () => {
        history.push("/sets/" + item.id);
    }

    return (
        <Box m={1} border={1} borderRadius={3} borderColor="#FFCF00" boxShadow={5}>
            <Card
                  onMouseOver={() => changeCardZoom(true)}
                  onMouseOut={() => changeCardZoom(false)}>
                <CardContent sx={{ p:1, '&:last-child': { pb: 0 }}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Stack direction="row" justifyContent="left" width='80%'>
                            <Typography variant="h7" color="text.secondary">{item.name}</Typography>
                        </Stack>
                        <IconButton color="secondary" aria-label="Редактировать" onClick={editClick}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton color="secondary" aria-label="Удалить" onClick={deleteClick}>
                            <DeleteIcon/>
                        </IconButton>
                    </Box>
                </CardContent>
                <CardMedia style={{overflow: "hidden", width: '100%'}}
                           component="img"
                           height="150"
                           image={`/${LEGO_IMG_ROOT}/series/${item.imgName}.jpg?w=248&fit=crop&auto=format`}
                           alt={item.imgName}
                           onError={addDefaultImg}
                           className={cardZoom ? classes.cardHovered : classes.root}
                           onClick={onCardClick}
                />
                <CardContent sx={{ p:1, '&:last-child': { pb: 2 }}} style={{overflow: "hidden", width: '100%'}}>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={3}>
                            <Typography variant="h8">Наборов</Typography>
                        </Grid>
                        <Grid container item xs={3} alignItems="center" justifyContent="center">
                            <Typography variant="h7">{item.setsCount}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

SeriesCard.propTypes = {
    item: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default SeriesCard;