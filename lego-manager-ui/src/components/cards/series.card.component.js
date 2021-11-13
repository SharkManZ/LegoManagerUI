import {Box, Grid, IconButton, ImageListItem, ImageListItemBar, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {makeStyles} from "@mui/styles";
import {useState} from "react";
const useStyles = makeStyles({
    root: {
        height: 200,
        width: '100%',
        transformOrigin: "scale(1)",
        transition: "transform .5s, visibility .5s ease-in"
    },
    cardHovered: {
        height: 200,
        width: '100%',
        transition: "transform .5s, visibility .5s ease-in",
        transform: "scale(1.1)"
    }
});
function SeriesCard({item}) {
    const classes = useStyles();
    const [cardZoom, setCardZoom] = useState(false);

    const addDefaultImg = (event) => {
        event.target.src = "/series/empty.png";
    }

    const changeCardZoom = (value) => {
        setCardZoom(value);
    }
    return (
        <Grid container border={1} borderRadius={3} borderColor="#FFCF00" boxShadow={5}
              onMouseOver={()=>changeCardZoom(true)}
              onMouseOut={()=>changeCardZoom(false)}>
            <ImageListItem>
                <Box style={{overflow: "hidden"}}>
                    <img src={`/series/${item.imgName}.jpg?w=248&fit=crop&auto=format`}
                         alt={item.imgName}
                         loading="lazy"
                         onError={addDefaultImg}
                         className={cardZoom ? classes.cardHovered : classes.root}
                    />
                </Box>
                <ImageListItemBar title={item.name} position="top">test</ImageListItemBar>
                <Grid container ml={2} alignItems="center" justifyContent="center" >
                    <Grid item xs={5}>
                        <Typography variant="h6">Наборов в серии</Typography>
                    </Grid>
                    <Grid container item xs={3} alignItems="center" justifyContent="center">
                        <Typography variant="h6">{item.setsCount}</Typography>
                    </Grid>
                    <Grid container item xs={4} alignItems="center" justifyContent="center">
                        <IconButton color="secondary" aria-label="Редактировать">
                            <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="Удалить">
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>

            </ImageListItem>
        </Grid>
    )
}

export default SeriesCard;