import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    Grid,
    ImageList,
    ImageListItem,
    ListSubheader,
    Pagination,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import SeriesCard from "../cards/series.card.component";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setDeleteConfirmOpenAction, setFormOpenAction, setPageAction, setSearchAction} from "../../store/crud.actions";
import {PAGE_CRUD_CONSTANTS} from "../../constants/pages/page.constants";
import ConfirmDialog from "../dialog/confirm.dialog.component";

function SeriesImageList({branch, itemsPerPage, onSave, onAdd, onEdit, onDelete, children}) {
    const dispatch = useDispatch();
    const totalCount = useSelector(state => state[branch].totalCount);
    const page = useSelector(state => state[branch].page);
    const data = useSelector(state => state[branch].rows);
    const dialogOpen = useSelector(state => state[branch].formOpen);
    const dialogTitle = useSelector(state => state[branch].formTitle);
    const deleteConfirmOpen = useSelector(state => state[branch].deleteConfirmOpen);
    const search = useSelector(state => state[branch].search);
    const [searchValue, setSearchValue] = useState();
    const [currentId, setCurrentId] = useState();

    const onSearchChange = (event) => {
        setSearchValue(event.target.value);
    }

    const onSearch = (event) => {
        if (event.key === 'Enter') {
            dispatch(setPageAction(1, branch));
            dispatch(setSearchAction(searchValue, branch));
        }
    }

    const onPageChange = (event, page) => {
        dispatch(setPageAction(page, branch));
    }

    const onClose = (event) => {
        dispatch(setFormOpenAction(false, null, branch));
    }

    const deleteAction = (id) => {
        setCurrentId(id);
        dispatch(setDeleteConfirmOpenAction(true, branch));
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
                                <TextField label="Название" variant="standard" fullWidth value={!searchValue ? search : searchValue}
                                           onChange={onSearchChange} onKeyUp={onSearch}></TextField>
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
                    <Button variant="contained" onClick={() => onSave()}>Сохранить</Button>
                    <Button variant="contained" onClick={onClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
            <ConfirmDialog
                open={deleteConfirmOpen}
                closeDialog={() => dispatch(setDeleteConfirmOpenAction(false, branch))}
                onConfirm={() => {
                    onDelete(currentId);
                }}
                message={PAGE_CRUD_CONSTANTS[branch].deleteFormTitle}
            />
        </div>
    )
}

export default SeriesImageList;