import {Box, Grid, Typography} from "@mui/material";
import CenterGridItem from "./grid.item.component";
import PropTypes from "prop-types";

function TotalCard({img, caption, totalCount, inStock, onClick}) {
    const onCardClick = () => {
        if (onClick === undefined) {
            return;
        }
        onClick();
    }
    return (
        <Grid container mt={2} border={1} borderRadius={3} borderColor="#FFCF00" boxShadow={5} height={280}
              onClick={onCardClick}>

            <Grid item xs={12}>
                <Box m={2}>
                    <Typography variant="h4">{caption}</Typography>
                </Box>
                <Grid container direction="row">
                    <CenterGridItem xs={6}>
                        <img src={img} alt="Карточка статистики"/>
                    </CenterGridItem>
                    <Grid item xs={6}>
                        <Box mt={6}/>
                        <Grid container direction="row">
                            <Grid item xs={7}>
                                <Typography variant="h5">Всего</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="h5">{totalCount.toLocaleString()}</Typography>
                            </Grid>
                        </Grid>
                        <Box mt={2}/>
                        <Grid container direction="row">
                            <Grid item xs={7}>
                                <Typography variant="h5">В коллекции</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant="h5">{inStock.toLocaleString()}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

TotalCard.propTypes = {
    img: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    totalCount: PropTypes.number.isRequired,
    inStock: PropTypes.number.isRequired,
    onClick: PropTypes.func
}

export default TotalCard;