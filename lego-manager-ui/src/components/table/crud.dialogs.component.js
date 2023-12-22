import Box from "@mui/material/Box";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {SUBMIT_FORM_ACTION} from "../../constants/crud.constants";
import ConfirmDialog from "../dialog/confirm.dialog.component";
import {PAGE_CRUD_CONSTANTS} from "../../constants/pages/page.constants";
import React from "react";

function CrudDialogs({
                         dialogOpen,
                         setDialogOpen,
                         dialogTitle,
                         setFormAction,
                         deleteDialogOpen,
                         setDeleteDialogOpen,
                         onDelete,
                         branch,
                         children
                     }) {
    return (
        <Box>
            <Dialog open={dialogOpen} fullWidth onClose={() => setDialogOpen(false)}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    {children}
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

export default CrudDialogs;