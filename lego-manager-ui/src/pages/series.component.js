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
import {useEffect, useState} from "react";
import {getSeries} from "../service/series.service";
import SeriesCard from "../components/cards/series.card.component";

const itemsPerPage = 2;

function SeriesPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState();
    const [searchValue, setSearchValue] = useState();
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, [page, search]);

    const fetchData = () => {
        getSeries({page: page - 1, rowsPerPage: itemsPerPage, search: search})
            .then(res => {
                setData(res.data);
                setTotalCount(res.totalCount);
            })
    }

    const onSearchChange = (event) => {
        setSearchValue(event.target.value);
    }

    const onSearch = (event) => {
        if (event.key === 'Enter') {
            setPage(1);
            setSearch(searchValue);
        }
    }

    const onPageChange = (event, page) => {
        setPage(page);
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

export default SeriesPage;
