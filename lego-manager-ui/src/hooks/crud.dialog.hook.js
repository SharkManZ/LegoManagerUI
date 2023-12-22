import {useState} from "react";
import {PAGE_CRUD_CONSTANTS} from "../constants/pages/page.constants";
import {ADD_FORM_ACTION, EDIT_FORM_ACTION} from "../constants/crud.constants";

function useCrudDialog(branch) {
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formAction, setFormAction] = useState();

    return {
        dialogTitle,
        dialogOpen,
        setDialogOpen,
        deleteDialogOpen,
        setDeleteDialogOpen,
        formAction,
        setFormAction,
        onAdd: () => {
            setDialogTitle(PAGE_CRUD_CONSTANTS[branch].addFormTitle);
            setFormAction(ADD_FORM_ACTION);
            setDialogOpen(true);
        },
        onEdit: () => {
            setDialogTitle(PAGE_CRUD_CONSTANTS[branch].editFormTitle);
            setFormAction(EDIT_FORM_ACTION);
            setDialogOpen(true);
        },
        onDelete: () => {
            setDeleteDialogOpen(true);
        }
    }
}

export default useCrudDialog