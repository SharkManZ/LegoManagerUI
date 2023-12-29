import {useEffect, useState} from "react";
import useUrlParams from "./url.params.hook";
const DEFAULT_SIZE = 10;
const DEFAULT_PAGE = 0;
const SIZE_PARAM = 'size';
const PAGE_PARAM = 'page';
const SEARCH_STR_PARAM = 'searchStr';
const SEARCH_EQ_PARAM = 'searchEquals';
const ORDER_BY_PARAM = 'orderBy';
const ORDER_DIRECTION_PARAM = 'orderDirection';

function useGridData() {
    const [urlParams, setUrlParam, removeUrlParam] = useUrlParams();
    const [size, setSize] = useState(parseInt(urlParams.get(SIZE_PARAM)) || DEFAULT_SIZE);
    const [page, setPage] = useState(parseInt(urlParams.get(PAGE_PARAM)) || DEFAULT_PAGE);
    const [orderBy, setOrderBy] = useState(urlParams.get(ORDER_BY_PARAM) || null);
    const [orderDirection, setOrderDirection] = useState(urlParams.get(ORDER_DIRECTION_PARAM) || 'asc');
    const [search, setSearch] = useState(urlParams.get(SEARCH_STR_PARAM) ? {
        value: urlParams.get(SEARCH_STR_PARAM),
        equals: urlParams.get(SEARCH_EQ_PARAM) === "true" || false
    } : null);
    const [currentRow, setCurrentRow] = useState();

    useEffect(() => {
        if (page === DEFAULT_PAGE) {
            removeUrlParam(PAGE_PARAM);
        } else {
            setUrlParam(PAGE_PARAM, page);
        }
    }, [page]);
    useEffect(() => {
        if (size === DEFAULT_SIZE) {
            removeUrlParam(SIZE_PARAM);
        } else {
            setUrlParam(SIZE_PARAM, size);
        }
    }, [size]);
    useEffect(() => {
        if (!search) {
            removeUrlParam(SEARCH_STR_PARAM);
            removeUrlParam(SEARCH_EQ_PARAM);
        } else {
            setUrlParam(SEARCH_STR_PARAM, search.value);
            setUrlParam(SEARCH_EQ_PARAM, search?.equals || false);
        }
    }, [search]);
    useEffect(() => {
        if (!orderBy) {
            removeUrlParam(ORDER_BY_PARAM);
            removeUrlParam(ORDER_DIRECTION_PARAM);
        } else {
            setUrlParam(ORDER_BY_PARAM, orderBy);
            setUrlParam(ORDER_DIRECTION_PARAM, orderDirection);
        }
    }, [orderBy, orderDirection]);

    return {
        gridData: {
            size,
            setSize,
            page,
            setPage,
            search,
            setSearch,
            orderBy,
            setOrderBy,
            orderDirection,
            setOrderDirection,
            currentRow,
            setCurrentRow
        },
        queryData: {
            size,
            page,
            search,
            sorts: orderBy ? [{field: orderBy, direction: orderDirection}] : null
        }
        ,
        resetGrid: () => {
            const isReset = page !== 0;
            setPage(0);
            return isReset;
        }
    }
}

export default useGridData