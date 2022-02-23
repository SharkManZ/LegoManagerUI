import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    ImageList,
    ImageListItem,
    ListSubheader,
    Pagination,
    Stack,
    Typography
} from "@mui/material";
import SeriesCard from "../cards/series.card.component";
import {useDispatch, useSelector} from "react-redux";
import {
    addFormOpenAction,
    deleteRequestAction,
    editFormWithValueOpenAction,
    setDeleteConfirmOpenAction,
    setDeleteConfirmOpenWithIdAction,
    setFormActionAction,
    setFormOpenAction,
    setPageAction
} from "../../store/reducer/crud.actions";
import {PAGE_CRUD_CONSTANTS} from "../../constants/pages/page.constants";
import ConfirmDialog from "../dialog/confirm.dialog.component";
import SearchField from "../fields/search.field.component";
import PropTypes from "prop-types";
import {SUBMIT_FORM_ACTION} from "../../constants/crud.constants";

function SeriesImageList({branch, itemsPerPage, children}) {
    const dispatch = useDispatch();
    const totalCount = useSelector(state => state[branch].totalCount);
    const page = useSelector(state => state[branch].page);
    const data = useSelector(state => state[branch].rows);
    const dialogOpen = useSelector(state => state[branch].formOpen);
    const dialogTitle = useSelector(state => state[branch].formTitle);
    const deleteConfirmOpen = useSelector(state => state[branch].deleteConfirmOpen);
    const currentRow = useSelector(state => state[branch].currentRow);

    const onPageChange = (event, page) => {
        dispatch(setPageAction(page, branch));
    }

    const onClose = () => {
        dispatch(setFormOpenAction(false, null, branch));
    }

    const deleteAction = (id) => {
        dispatch(setDeleteConfirmOpenWithIdAction(true, id, branch));
    }

    const onAdd = () => {
        dispatch(addFormOpenAction(branch));
    }

    const onEdit = (value) => {
        dispatch(editFormWithValueOpenAction(branch, value));
    }

    const onSubmit = () => {
        dispatch(setFormActionAction(SUBMIT_FORM_ACTION, branch));
    }

    const onDelete = () => {
        dispatch(deleteRequestAction({id: currentRow.id}, branch));
    }

    return (
        <div>
            <ImageList gap={30} cols={4} style={{overflow: "hidden", padding: 10}}>
                <ImageListItem key="subheader" cols={4}>
                    <ListSubheader component="div">
                        <Grid container alignItems="center" justifyContent="center" color={"deepskyblue"}>
                            <Typography variant="h4">Серии наборов</Typography>
                        </Grid>
                        <Grid container alignItems="center" justifyContent="center" color={"deepskyblue"}>
                            <Stack direction="row" style={{width: '100%'}} spacing={2}>
                                <SearchField branch={branch}/>
                                <Button variant="outlined" onClick={onAdd}>Добавить</Button>
                            </Stack>
                        </Grid>
                    </ListSubheader>
                </ImageListItem>
                {data.map((item) => (
                    <SeriesCard key={item.id} item={item} onEdit={onEdit} onDelete={deleteAction}/>
                ))}
            </ImageList>
            <Grid container justifyContent="center">
                <Pagination count={Math.ceil(totalCount / itemsPerPage)} page={page} onChange={onPageChange}
                            showFirstButton showLastButton/>
            </Grid>
            <Dialog open={dialogOpen} fullWidth onClose={onClose}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={onSubmit}>Сохранить</Button>
                    <Button variant="contained" onClick={onClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
            <ConfirmDialog
                open={deleteConfirmOpen}
                closeDialog={() => dispatch(setDeleteConfirmOpenAction(false, branch))}
                onConfirm={onDelete}
                message={PAGE_CRUD_CONSTANTS[branch].deleteFormTitle}
            />
        </div>
    )
}

SeriesImageList.propTypes = {
    branch: PropTypes.string.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    children: PropTypes.array
}

export default SeriesImageList;