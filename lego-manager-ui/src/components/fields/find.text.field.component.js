import {Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {setErrorAction} from "../../store/reducer/app.actions";
import {useDispatch} from "react-redux";

function FindTextField({name, itemId, itemName, onSelectItem,
                           searchFunc, searchFuncParams, searchParam, evalName, textValue, ...otherProps}) {
    const dispatch = useDispatch();
    const [fieldValue, setFieldValue] = useState(itemName);
    const [localFound, setLocalFound] = useState(itemId !== undefined && itemId !== null);
    const [searchComplete, setSearchComplete] = useState(false);
    const [foundValue, setFoundValue] = useState();

    const onChange = (event) => {
        setFieldValue(event.target.value);
        itemId = undefined;
        setLocalFound(false);
        setFoundValue(null);
        setSearchComplete(false);
    }

    useEffect(() => {
        if (textValue) {
            runSearch(textValue);
        }
    }, [textValue]);

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            runSearch(fieldValue);
        }
    }

    const runSearch = (value) => {
        let params = searchFuncParams ? searchFuncParams : {};
        params[searchParam] = value;
        searchFunc(params).then(res => {
            if (res !== undefined) {
                onSelectItem(res.id);
                setFoundValue(evalName(res));
                setLocalFound(true)
            }
            setSearchComplete(true);
        }).catch(error => {
            dispatch(setErrorAction(error));
        })
    }

    const getTextColor = () => {
        return localFound ? '#13B633' : (searchComplete ? 'red' : 'black');
    }

    return (
        <Stack direction="column">
            <TextField name={name}
                       value={fieldValue ? fieldValue : textValue}
                       onChange={onChange}
                       onKeyPress={onKeyPress}
                       inputProps={{style: {color: getTextColor()}}}
                       fullWidth
                       {...otherProps}/>
            <Typography>{foundValue}</Typography>
        </Stack>
    )
}

FindTextField.propTypes = {
    name: PropTypes.string.isRequired,
    itemId: PropTypes.number,
    itemName: PropTypes.string,
    onSelectItem: PropTypes.func.isRequired,
    searchFunc: PropTypes.func.isRequired,
    searchFuncParams: PropTypes.object,
    searchParam: PropTypes.string.isRequired,
    evalName: PropTypes.func.isRequired
}

export default FindTextField;