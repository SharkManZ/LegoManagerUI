import {Box, Grid, Typography} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import {USERS_BRANCH} from "../../constants/pages/page.constants";
import useCrudActions from "../../components/action/crud.actions";
import UsersForm from "./users.form.component";

const branch = USERS_BRANCH;

function UsersPage() {
    const {editAction, deleteAction} = useCrudActions(branch);

    return (
        <Box>
            <Grid container alignItems="center" justifyContent="center" color={"deepskyblue"} mt={3}>
                <Typography variant="h4">Владельцы</Typography>
            </Grid>
            <MainTable rowActions={[editAction, deleteAction]} branch={branch}>
                <UsersForm/>
            </MainTable>
        </Box>
    )
}

export default UsersPage;