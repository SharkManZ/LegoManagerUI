import {Card, CardContent, CardMedia, Popover, Popper, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {setErrorAction} from "../../store/reducer/app.actions";
import {useDispatch} from "react-redux";
import {LEGO_IMG_ROOT} from "../../constants/pages/page.constants";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    root: {
        height: "auto",
        width: "auto",
        maxHeight: 100,
        maxWidth: 100,
        objectFit: 'cover',
        margin: "auto"
    }
});

function FindTextField({
                           name, itemId, itemName, onSelectItem,
                           searchFunc, searchFuncParams, searchParam, evalName, textValue,
                           afterSearchSuccess, imgPath,
                           ...otherProps
                       }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [fieldValue, setFieldValue] = useState(itemName);
    const [localFound, setLocalFound] = useState(itemId !== undefined && itemId !== null);
    const [searchComplete, setSearchComplete] = useState(false);
    const [foundValue, setFoundValue] = useState();
    const [popperOpen, setPopperOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState();

    const onChange = (event) => {
        setFieldValue(event.target.value);
        itemId = undefined;
        setLocalFound(false);
        setFoundValue(null);
        setSearchComplete(false);
        setPopperOpen(false);
    }

    useEffect(() => {
        if (textValue) {
            setAnchorEl(document.getElementById("findField"));
            runSearch(textValue);
        }
    }, [textValue]);

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            runSearch(fieldValue);
            setAnchorEl(event.currentTarget);
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
                if (afterSearchSuccess) {
                    afterSearchSuccess();
                }
                setPopperOpen(true);
            }
            setSearchComplete(true);
        }).catch(error => {
            dispatch(setErrorAction(error));
        })
    }

    const getTextColor = () => {
        return localFound ? '#13B633' : (searchComplete ? 'red' : 'black');
    }

    const addDefaultImg = (event) => {
        event.target.src = `/empty.png`;
    }

    return (
        <Stack direction="column">
            <TextField id="findField" name={name}
                       value={fieldValue ? fieldValue : textValue}
                       onChange={onChange}
                       onKeyPress={onKeyPress}
                       inputProps={{style: {color: getTextColor()}}}
                       fullWidth
                       {...otherProps}/>

            <Popper style={{zIndex: 1500}} id="findTextFieldPopover" open={popperOpen} anchorEl={anchorEl}
                    placement="top"
                     anchorOrigin={{
                         vertical: 'top',
                         horizontal: 'center',
                     }}
                     transformOrigin={{
                         vertical: 'bottom',
                         horizontal: 'center',
                     }}>
                <Card>
                    <CardMedia
                        component="img"
                        image={`/${LEGO_IMG_ROOT}/${imgPath}/${fieldValue ? fieldValue : textValue}.png`}
                        className={classes.root}
                        onError={addDefaultImg}/>
                    <CardContent>
                        <Typography>{foundValue}</Typography>
                    </CardContent>
                </Card>
            </Popper>
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