import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import {PAGE_CRUD_CONSTANTS, USERS_BRANCH} from "../../constants/pages/page.constants";
import UsersForm from "./users.form.component";
import {userApi} from "../../api/user.api";
import useGridData from "../../hooks/grid.data.hook";
import useCrudDialog from "../../hooks/crud.dialog.hook";
import CrudDialogs from "../../components/table/crud.dialogs.component";

const branch = USERS_BRANCH;

function UsersPage() {
    const {gridData, queryData, resetGrid} = useGridData();
    const [fetchUsers, result] = userApi.useLazyGetUsersQuery();
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
    const [deleteUserQuery] = userApi.useDeleteUserMutation();

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

    /**
     * Удаление пользователя.
     */
    const deleteUser = () => {
        deleteUserQuery(gridData.currentRow.id)
            .unwrap()
            .then(() => {
                setDeleteDialogOpen(false);
                fetchData(true);
            })
    }

    const fetchData = (withReset) => {
        if (withReset) {
            let wasReset = resetGrid();
            if (!wasReset) {
                fetchUsers(queryData)
            }
        } else {
            fetchUsers(queryData);
        }
    }

    return (
        <Box>
            <Grid container alignItems="center" justifyContent="center" color={"deepskyblue"} mt={3}>
                <Typography variant="h4">Владельцы</Typography>
            </Grid>
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
                         setFormAction={setFormAction} onDelete={deleteUser} setDeleteDialogOpen={setDeleteDialogOpen}
                         deleteDialogOpen={deleteDialogOpen} branch={branch}>
                <UsersForm currentRow={gridData.currentRow} formAction={formAction} setDialogOpen={setDialogOpen}
                           saveCallback={fetchData}/>
            </CrudDialogs>
        </Box>
    )
}

export default UsersPage;