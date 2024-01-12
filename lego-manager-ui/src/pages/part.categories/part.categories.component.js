import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import MainTable from "../../components/table/main.table.component";
import {PAGE_CRUD_CONSTANTS, PART_CATEGORIES_BRANCH} from "../../constants/pages/page.constants";
import PartCategoriesForm from "./part.categories.form.component";
import useGridData from "../../hooks/grid.data.hook";
import {partCategoryApi} from "../../api/part.category.api";
import useCrudDialog from "../../hooks/crud.dialog.hook";
import CrudDialogs from "../../components/table/crud.dialogs.component";

const branch = PART_CATEGORIES_BRANCH;

function PartCategoriesPage() {
    const {gridData, queryData, resetGrid} = useGridData();
    const [fetchList, result] = partCategoryApi.useLazyListQuery();
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
    const [deletePartCategoryQuery] = partCategoryApi.useDeleteMutation();

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

    const deletePartCategory = () => {
        deletePartCategoryQuery(gridData.currentRow.id)
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
                fetchList(queryData)
            }
        } else {
            fetchList(queryData);
        }
    }

    return (
        <Box>
            <Grid container alignItems="center" justifyContent="center" color={"deepskyblue"} mt={3}>
                <Typography variant="h4">Категории деталей</Typography>
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
                         setFormAction={setFormAction} onDelete={deletePartCategory}
                         setDeleteDialogOpen={setDeleteDialogOpen}
                         deleteDialogOpen={deleteDialogOpen} branch={branch}>
                <PartCategoriesForm currentRow={gridData.currentRow} formAction={formAction}
                                    setDialogOpen={setDialogOpen}
                                    saveCallback={fetchData}/>
            </CrudDialogs>
        </Box>
    )
}

export default PartCategoriesPage;