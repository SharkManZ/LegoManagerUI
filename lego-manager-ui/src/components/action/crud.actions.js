import {useDispatch, useSelector} from "react-redux";
import {setActionAnchorElAction, setDeleteConfirmOpenAction, setFormOpenAction} from "../../store/reducer/crud.actions";
import {PAGE_CRUD_CONSTANTS} from "../../constants/pages/page.constants";

function useCrudActions({branch, formik, getValues, additionalEditAction}) {
    const dispatch = useDispatch();
    const currentRow = useSelector(state => state[branch].currentRow);

    const editAction = () => {
        if (getValues) {
            formik.setValues(getValues(currentRow));
        } else {
            formik.setValues(currentRow);
        }
        if (additionalEditAction) {
            additionalEditAction(currentRow);
        }
        dispatch(setFormOpenAction(true, PAGE_CRUD_CONSTANTS[branch].editFormTitle, branch));
        dispatch(setActionAnchorElAction(null, branch));
    }

    const deleteAction = () => {
        dispatch(setActionAnchorElAction(null, branch));
        dispatch(setDeleteConfirmOpenAction(true, branch));
    }

    return ({
        editAction,
        deleteAction,
        currentRow
    })
}

export default useCrudActions;