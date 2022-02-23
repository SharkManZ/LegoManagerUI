import {IconButton, Stack, TextField, ToggleButton} from "@mui/material";
import TextSnippet from "@mui/icons-material/TextSnippet";
import ClearIcon from '@mui/icons-material/Clear';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPageAction, setSearchAction} from "../../store/reducer/crud.actions";
import PropTypes from "prop-types";

function SearchField({branch}) {
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState();
    const search = useSelector(state => state[branch].search);
    const [equals, setEquals] = useState(false);

    const onSearchChange = (event) => {
        setSearchValue(event.target.value);
    }

    const onEqualsChange = () => {
        setEquals(!equals);
    }

    const onSearch = (event) => {
        if (event.key === 'Enter') {
            dispatch(setPageAction(0, branch));
            dispatch(setSearchAction({value: searchValue, equals: equals}, branch));
        }
    }

    const onClear = () => {
        setSearchValue("");
        dispatch(setPageAction(0, branch));
        dispatch(setSearchAction({value: "", equals: equals}, branch));
    }

    useEffect(() => {
        if (search && search.value) {
            setSearchValue(search.value);
        }
    }, [])

    return (
        <Stack direction="row" style={{width: '100%'}}>
            <TextField label="Поиск" variant="standard" fullWidth value={searchValue}
                       onChange={onSearchChange} onKeyUp={onSearch}
                       InputProps={{
                           endAdornment:
                               <Stack direction="row">
                                   <ToggleButton value="W" size="small" selected={equals}
                                                 onChange={onEqualsChange}><TextSnippet/></ToggleButton>
                                   <IconButton onClick={onClear}><ClearIcon/></IconButton>
                               </Stack>
                       }}
            />
        </Stack>
    )
}

SearchField.propTypes = {
    branch: PropTypes.string.isRequired
}

export default SearchField;