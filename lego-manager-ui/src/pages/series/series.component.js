import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchDataRequestAction} from "../../store/reducer/crud.actions";
import SeriesImageList from "../../components/imagelist/series.imagelist.component";
import {useSnackbar} from "notistack";
import {SERIES_BRANCH} from "../../constants/pages/page.constants";
import SeriesForm from "./series.form.component";

const itemsPerPage = 16;

const branch = SERIES_BRANCH;

function SeriesPage() {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    // grid
    const page = useSelector(state => state[branch].page);
    const search = useSelector(state => state[branch].search);
    const needRefresh = useSelector(state => state[branch].needRefresh);
    const prevNeedRefresh = useRef(null);

    useEffect(() => {
        // обновление данных из-за изменения признака необходимости обновить
        if (needRefresh !== prevNeedRefresh.current) {
            if (prevNeedRefresh.current && needRefresh === false) {
                prevNeedRefresh.current = needRefresh;
                return;
            }
            prevNeedRefresh.current = needRefresh;
        }
        fetchData();
    }, [page, needRefresh]);

    const fetchData = () => {
        dispatch(fetchDataRequestAction({
            page: page > 0 ? page - 1 : 0,
            rowsPerPage: itemsPerPage,
            search: search,
            enqueueSnackbar
        }, branch));
    }

    return (
        <SeriesImageList
            branch={branch}
            itemsPerPage={itemsPerPage}
        >
            <SeriesForm/>
        </SeriesImageList>
    )
}

export default SeriesPage;
