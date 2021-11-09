import styled from "@emotion/styled";
import {Box, Grid, Paper} from "@mui/material";

const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    boxShadow: {},
    color: theme.palette.text.secondary,
}));

function CenterGridItem({xs, children}) {
    return (
        <Grid item xs={xs}     item
              container
              direction="column"
              display="flex"
              justify="center">
            <Item>{children}</Item>
        </Grid>
    )
}

export default CenterGridItem;