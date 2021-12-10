import {Stack, TextField} from "@mui/material";
import {useState} from "react";

function FindTextField({name, itemId, itemName, onSelectItem,
                           searchFunc, searchFuncParams, searchParam, evalName, ...otherProps}) {
    const [fieldValue, setFieldValue] = useState(itemName);
    const [localFound, setLocalFound] = useState(itemId !== undefined && itemId !== null);
    const [searchComplete, setSearchComplete] = useState(false);

    const onChange = (event) => {
        setFieldValue(event.target.value);
        itemId = undefined;
        setLocalFound(false);
        setSearchComplete(false);
    }

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchFuncParams[searchParam] = fieldValue;
            searchFunc(searchFuncParams).then(res => {
                if (res !== undefined) {
                    onSelectItem(res.id);
                    setFieldValue(evalName(res));
                    setLocalFound(true)
                }
                setSearchComplete(true);
            })
        }
    }

    const getTextColor = () => {
        return localFound ? '#13B633' : (searchComplete ? 'red' : 'black');
    }

    return (
        <Stack direction="row">
            <TextField name={name}
                       value={fieldValue}
                       onChange={onChange}
                       onKeyPress={onKeyPress}
                       inputProps={{style: {color: getTextColor()}}}
                       fullWidth
                       {...otherProps}/>
        </Stack>
    )
}

export default FindTextField;