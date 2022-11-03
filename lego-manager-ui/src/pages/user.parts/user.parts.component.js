import {Box, Grid, Typography} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import {USER_PARTS_BRANCH} from "../../constants/pages/page.constants";
import {useDispatch, useSelector} from "react-redux";
import useCrudActions from "../../components/action/crud.actions";
import {useEffect} from "react";
import {setNeedRefreshAction} from "../../store/reducer/crud.actions";
import UserPartForm from "./user.parts.form.component";

const branch = USER_PARTS_BRANCH;

function UserPartsPage() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.app.userId);
    const {editAction, deleteAction} = useCrudActions(branch);

    useEffect(() => {
        if (!currentUser) {
            return;
        }
        dispatch(setNeedRefreshAction(branch));
    }, [currentUser]);

    return (
        <Box>
            {/*<Grid container alignItems="center" justifyContent="center" color={"deepskyblue"} mt={3}>*/}
            {/*    <Typography variant="h4">Наборы владельца</Typography>*/}
            {/*</Grid>*/}
            {!currentUser ? (
                <Grid container alignItems="center" justifyContent="center" mt={3}>
                    <Typography variant="h5">Для отображения наборов необходимо выбрать текущего владельца.</Typography>
                </Grid>
            ) : (
                <Box>
                    <MainTable rowActions={[editAction, deleteAction]} branch={branch}
                               fetchRequest={{userId: currentUser}}>
                        <UserPartForm/>
                    </MainTable>
                </Box>
            )
            }
        </Box>
    )
}

export default UserPartsPage;