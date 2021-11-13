import {
    Button,
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
import {setPageAction, setSearchAction} from "../../store/crud.actions";

function SeriesImageList({branch, itemsPerPage}) {
    const dispatch = useDispatch();
    const totalCount = useSelector(state => state[branch].totalCount);
    const page = useSelector(state => state[branch].page);
    const data = useSelector(state => state[branch].rows);
    const [searchValue, setSearchValue] = useState();

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
    return (
        <div>
            <ImageList gap={30} cols={3} style={{overflow: "hidden", padding: 10}}>
                <ImageListItem key="subheader" cols={3}>
                    <ListSubheader component="div">
                        <Grid container alignItems="center" justifyContent="center" color={"deepskyblue"}>
                            <Typography variant="h4">Серии наборов</Typography>
                        </Grid>
                        <Grid container alignItems="center" justifyContent="center" color={"deepskyblue"}>
                            <Stack direction="row" style={{width: '100%'}} spacing={2}>
                                <TextField label="Название" variant="standard" fullWidth
                                           onChange={onSearchChange} onKeyUp={onSearch}></TextField>
                                <Button variant="outlined">Добавить</Button>
                            </Stack>
                        </Grid>
                    </ListSubheader>
                </ImageListItem>
                {data.map((item) => (
                    <SeriesCard key={item.id} item={item}/>
                ))}
            </ImageList>
            <Grid container justifyContent="center">
                <Pagination count={Math.ceil(totalCount / itemsPerPage)} page={page} onChange={onPageChange}
                            showFirstButton showLastButton/>
            </Grid>
        </div>
    )
}

export default SeriesImageList;