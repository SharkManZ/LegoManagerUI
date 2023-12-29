import React, {useState} from 'react';
import {IconButton, Stack, TextField, ToggleButton} from "@mui/material";
import TextSnippet from "@mui/icons-material/TextSnippet";
import ClearIcon from '@mui/icons-material/Clear';

function SearchField({onSearchCallback, search}) {

    const [searchValue, setSearchValue] = useState(search?.value || '');
    const [equals, setEquals] = useState(search?.equals || false);

    const onSearchChange = (event) => {
        setSearchValue(event.target.value);
    }

    const onEqualsChange = () => {
        setEquals(!equals);
    }

    const onSearch = (event) => {
        if (event.key === 'Enter') {
            onSearchCallback(searchValue && searchValue !== "" ? {value: searchValue, equals: equals} : null);
        }
    }

    const onClear = () => {
        setSearchValue('');
        onSearchCallback(null);
    }

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

export default SearchField;