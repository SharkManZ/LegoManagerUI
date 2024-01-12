import React, {useEffect} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import {PAGE_CRUD_CONSTANTS, USER_SETS_BRANCH} from "../../constants/pages/page.constants";
import {useSelector} from "react-redux";
import UserSetForm from "./user.sets.form.component";
import UserSetsSummary from "./user.sets.summary.component";
import useGridData from "../../hooks/grid.data.hook";
import {userSetApi} from "../../api/user.sets.api";
import useCrudDialog from "../../hooks/crud.dialog.hook";
import CrudDialogs from "../../components/table/crud.dialogs.component";

const branch = USER_SETS_BRANCH;

function UserSetsPage() {
    const {gridData, queryData, resetGrid} = useGridData();
    const [fetchUserSets, result] = userSetApi.useLazyGetUserSetsQuery();
    const {
        dialogTitle,
        dialogOpen,
        setDialogOpen,
        deleteDialogOpen,
        setDeleteDialogOpen,
        formAction,
        setFormAction,
        onAdd,
        onEdit,
        onDelete
    } = useCrudDialog(branch);
    const userId = useSelector(state => state.app.userId);
    const [deleteUserSetQuery] = userSetApi.useDeleteUserSetMutation();

    const actions = [
        {
            key: 'editAction',
            title: 'Редактировать',
            onClick: onEdit
        },
        {
            key: 'deleteAction',
            title: 'Удалить',
            onClick: onDelete
        }
    ]

    const deleteUserSet = () => {
        deleteUserSetQuery(gridData.currentRow.id)
            .unwrap()
            .then(() => {
                setDeleteDialogOpen(false);
                fetchData(true);
            })
    }

    const fetchData = (withReset) => {
        const args = {id: userId, params: queryData};
        if (withReset) {
            let wasReset = resetGrid();
            if (!wasReset) {
                fetchUserSets(args)
            }
        } else {
            fetchUserSets(args);
        }
    }

    useEffect(() => {
        if (!userId) {
            return;
        }
        fetchData(true);
    }, [userId]);

    return (
        <Box>
            {!userId ? (
                <Grid container alignItems="center" justifyContent="center" mt={3}>
                    <Typography variant="h5">Для отображения наборов необходимо выбрать текущего владельца.</Typography>
                </Grid>
            ) : (
                <Box>
                    <UserSetsSummary/>
                    <MainTable
                        columns={PAGE_CRUD_CONSTANTS[branch].columns}
                        grid={{
                            ...gridData,
                            total: result?.data?.totalCount || 0
                        }}
                        queryData={queryData}
                        fetchFunction={fetchData}
                        rows={result?.data ? result.data.data : []}
                        rowActions={actions}
                        loading={result?.isLoading}
                        addAction={onAdd}
                        setCurrentRow={gridData.setCurrentRow}
                        branch={branch}>

                    </MainTable>
                    <CrudDialogs dialogTitle={dialogTitle} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}
                                 setFormAction={setFormAction} onDelete={deleteUserSet}
                                 setDeleteDialogOpen={setDeleteDialogOpen}
                                 deleteDialogOpen={deleteDialogOpen} branch={branch}>
                        <UserSetForm currentRow={gridData.currentRow} formAction={formAction}
                                     setDialogOpen={setDialogOpen}
                                     saveCallback={fetchData}/>
                    </CrudDialogs>
                </Box>
            )
            }
        </Box>
    )
}

export default UserSetsPage;