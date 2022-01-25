import {Box, Grid, Typography} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import {PART_CATEGORIES_BRANCH} from "../../constants/pages/page.constants";
import useCrudActions from "../../components/action/crud.actions";
import PartCategoriesForm from "./part.categories.form.component";

const branch = PART_CATEGORIES_BRANCH;

function PartCategoriesPage() {
    const {editAction, deleteAction} = useCrudActions(branch);

    return (
        <Box>
            <Grid container alignItems="center" justifyContent="center" color={"deepskyblue"} mt={3}>
                <Typography variant="h4">Категории деталей</Typography>
            </Grid>
            <MainTable rowActions={[editAction, deleteAction]} branch={branch}>
                <PartCategoriesForm/>
            </MainTable>
        </Box>
    )
}

export default PartCategoriesPage;