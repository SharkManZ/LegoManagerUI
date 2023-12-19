import {useState} from "react";

function useGridData() {
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(0);
    const [orderBy, setOrderBy] = useState();
    const [orderDirection, setOrderDirection] = useState('asc');
    const [search, setSearch] = useState();

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
            setOrderDirection
        },
        queryData: {
            size,
            page,
            search,
            sorts: orderBy ? [{field: orderBy, direction: orderDirection}] : null
        },
        resetGrid: () => {
            setSize(10);
            setPage(0)
        }
    }
}

export default useGridData