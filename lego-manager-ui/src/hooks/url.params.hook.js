import {useHistory, useLocation} from "react-router-dom";

function useUrlParams() {
    const history = useHistory();
    const location = useLocation();

    const urlParams = new URLSearchParams(location.search);

    const setUrlParam = (name, value) => {
        urlParams.set(name, value);

        history.push({
            pathname: location.pathname,
            search: urlParams.toString()
        })
    }

    const removeUrlParam = (name) => {
        urlParams.delete(name);

        history.push({
            pathname: location.pathname,
            search: urlParams.toString()
        })
    }

    return [urlParams, setUrlParam, removeUrlParam];
}

export default useUrlParams