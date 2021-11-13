import {useEffect} from "react";
import {getSeries} from "../service/series.service";
import {useDispatch, useSelector} from "react-redux";
import {fetchDataAction, setTotalCountAction} from "../store/crud.actions";
import SeriesImageList from "../components/imagelist/series.imagelist.component";
import {useSnackbar} from "notistack";

const itemsPerPage = 9;
const branch = "series";

function SeriesPage() {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const page = useSelector(state => state[branch].page);
    const search = useSelector(state => state[branch].search);
    useEffect(() => {
        fetchData();
    }, [page, search]);

    const fetchData = () => {
        getSeries({page: page - 1, rowsPerPage: itemsPerPage, search: search, enqueueSnackbar})
            .then(res => {
                dispatch(fetchDataAction(res.data, branch));
                dispatch(setTotalCountAction(res.totalCount, branch));
            })
    }


    return (
        <SeriesImageList branch={branch} itemsPerPage={itemsPerPage}/>
    )
}

export default SeriesPage;
