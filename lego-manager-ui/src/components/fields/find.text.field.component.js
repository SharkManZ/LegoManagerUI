import {Stack, TextField} from "@mui/material";
import {useState} from "react";
import PropTypes from "prop-types";

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
                       multiline
                       {...otherProps}/>
        </Stack>
    )
}

FindTextField.propTypes = {
    name: PropTypes.string.isRequired,
    itemId: PropTypes.number,
    itemName: PropTypes.string,
    onSelectItem: PropTypes.func.isRequired,
    searchFunc: PropTypes.func.isRequired,
    searchFuncParams: PropTypes.object.isRequired,
    searchParam: PropTypes.string.isRequired,
    evalName: PropTypes.func.isRequired
}

export default FindTextField;