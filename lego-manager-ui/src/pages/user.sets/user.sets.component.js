import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import {USER_SETS_BRANCH} from "../../constants/pages/page.constants";
import {useDispatch, useSelector} from "react-redux";
import useCrudActions from "../../components/action/crud.actions";
import {useEffect} from "react";
import {setNeedRefreshAction} from "../../store/reducer/crud.actions";
import UserSetForm from "./user.sets.form.component";
import UserSetsSummary from "./user.sets.summary.component";

const branch = USER_SETS_BRANCH;

function UserSetsPage() {
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
                    <UserSetsSummary/>
                    <MainTable rowActions={[editAction, deleteAction]} branch={branch}
                               fetchRequest={{userId: currentUser}}>
                        <UserSetForm/>
                    </MainTable>
                </Box>
            )
            }
        </Box>
    )
}

export default UserSetsPage;