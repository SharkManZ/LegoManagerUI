import {useDispatch} from "react-redux";
import {
    editFormOpenAction,
    setActionAnchorElAction,
    setDeleteConfirmOpenAction
} from "../../store/reducer/crud.actions";

function useCrudActions(branch) {
    const dispatch = useDispatch();

    const editAction = () => {
        dispatch(editFormOpenAction(branch));
    }

    const deleteAction = () => {
        dispatch(setActionAnchorElAction(null, branch));
        dispatch(setDeleteConfirmOpenAction(true, branch));
    }

    return ({
        editAction: {
            title: 'Редактировать',
            onClick: editAction
        },
        deleteAction:
            {
                title: 'Удалить',
                onClick: deleteAction
            }
    })
}

export default useCrudActions;