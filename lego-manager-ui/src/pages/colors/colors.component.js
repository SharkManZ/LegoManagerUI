import {Box, Grid, Typography} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import {COLORS_BRANCH} from "../../constants/pages/page.constants";
import useCrudActions from "../../components/action/crud.actions";
import ColorsForm from "./colors.form.component";

const branch = COLORS_BRANCH;

function ColorsPage() {
    const {editAction, deleteAction} = useCrudActions(branch);

    return (
        <Box>
            <Grid container alignItems="center" justifyContent="center" color={"deepskyblue"} mt={3}>
                <Typography variant="h4">Цвета</Typography>
            </Grid>
            <MainTable rowActions={[editAction, deleteAction]} branch={branch}>
                <ColorsForm/>
            </MainTable>
        </Box>
    )
}

export default ColorsPage;