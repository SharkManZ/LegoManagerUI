import styled from "@emotion/styled";
import {Box, Grid} from "@mui/material";
import PropTypes from "prop-types";

const Item = styled(Box)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    boxShadow: {},
    color: theme.palette.text.secondary,
}));

function CenterGridItem({xs, children}) {
    return (
        <Grid item xs={xs}
              container
              direction="column"
              display="flex"
              justify="center">
            <Item>{children}</Item>
        </Grid>
    )
}

CenterGridItem.propTypes = {
    xs: PropTypes.number.isRequired,
    children: PropTypes.object.isRequired
}

export default CenterGridItem;