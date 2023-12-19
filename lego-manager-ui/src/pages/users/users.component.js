import React, {useEffect, useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import {PAGE_CRUD_CONSTANTS, USERS_BRANCH} from "../../constants/pages/page.constants";
import UsersForm from "./users.form.component";
import {userApi} from "../../api/user.api";
import useGridData from "../../hooks/grid.data.hook";
import {ADD_FORM_ACTION, EDIT_FORM_ACTION, SUBMIT_FORM_ACTION} from "../../constants/crud.constants";
import ConfirmDialog from "../../components/dialog/confirm.dialog.component";

const branch = USERS_BRANCH;

function UsersPage() {
    const {gridData, queryData, resetGrid} = useGridData();
    const {data: users} = userApi.useGetUsersQuery(queryData);
    const [currentRow, setCurrentRow] = useState();
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formAction, setFormAction] = useState();
    const [deleteUserQuery] = userApi.useDeleteUserMutation();
    const actions = [
        {
            key: 'editAction',
            title: 'Редактировать',
            onClick: () => {
                setDialogTitle(PAGE_CRUD_CONSTANTS[branch].editFormTitle);
                setFormAction(EDIT_FORM_ACTION);
                setDialogOpen(true);
            }
        },
        {
            key: 'deleteAction',
            title: 'Удалить',
            onClick: () => {
                setDeleteDialogOpen(true);
            }
        }
    ]

    const onAdd = () => {
        setDialogTitle(PAGE_CRUD_CONSTANTS[branch].addFormTitle);
        setFormAction(ADD_FORM_ACTION);
        setDialogOpen(true);
    }

    const onDelete = () => {
        deleteUserQuery(currentRow.id)
            .unwrap()
            .then(() => {
                setDeleteDialogOpen(false);
                resetGrid();
            })
    }

    const saveCallback = () => {
        resetGrid();
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
                    total: users?.totalCount || 0
                }}
                rows={users ? users.data : []}
                rowActions={actions}
                addAction={onAdd}
                setCurrentRow={setCurrentRow}
                branch={branch}>

            </MainTable>
            <Dialog open={dialogOpen} fullWidth onClose={() => setDialogOpen(false)}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <UsersForm currentRow={currentRow} formAction={formAction} setDialogOpen={setDialogOpen} saveCallback={saveCallback}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setFormAction(SUBMIT_FORM_ACTION)}>Сохранить</Button>
                    <Button variant="contained" onClick={() => setDialogOpen(false)}>Отмена</Button>
                </DialogActions>
            </Dialog>
            <ConfirmDialog
                open={deleteDialogOpen}
                closeDialog={() => setDeleteDialogOpen(false)}
                onConfirm={onDelete}
                message={PAGE_CRUD_CONSTANTS[branch].deleteFormTitle}
            />
        </Box>
    )
}

export default UsersPage;