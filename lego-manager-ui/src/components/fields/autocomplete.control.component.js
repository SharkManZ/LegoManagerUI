import {Autocomplete, Box, TextField} from "@mui/material";
import PropTypes from "prop-types";

function AutocompleteControl({options, selectedValue, setOption, disabled, ...otherProps}) {
    const isDisabled = disabled ? true : false;
    return (
        <Autocomplete options={options} disabled={isDisabled}
                      value={selectedValue} fullWidth
                      onChange={(event, value) => setOption(value)}
                      getOptionLabel={(option) => option && option.name ? option.name : ''}
                      isOptionEqualToValue={(option, value) => value && option.id === value.id}
                      renderInput={(params) => (
                          <TextField
                              fullWidth
                              disabled
                              {...params}
                              {...otherProps}
                          />)}
                      renderOption={(props, option) => (
                          <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                              {option.name}
                          </Box>
                      )}
        />
    )
}

AutocompleteControl.propTypes = {
    options: PropTypes.array,
    selectedValue: PropTypes.object,
    setOption: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

export default AutocompleteControl;