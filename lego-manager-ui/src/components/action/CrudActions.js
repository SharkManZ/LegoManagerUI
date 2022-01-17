import {useDispatch} from "react-redux";
import {setActionAnchorElAction, setDeleteConfirmOpenAction} from "../../store/reducer/crud.actions";

function useActions(branch) {
    const dispatch = useDispatch();

    const deleteAction = () => {
        dispatch(setActionAnchorElAction(null, branch));
        dispatch(setDeleteConfirmOpenAction(true, branch));
    }

    return ({
        deleteAction
    })
}

export default useActions;