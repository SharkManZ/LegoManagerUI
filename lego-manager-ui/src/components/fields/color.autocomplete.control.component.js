import {Autocomplete, Box, Stack, TextField} from "@mui/material";
import PropTypes from "prop-types";

function ColorAutocompleteControl({options, selectedValue, setOption, disabled, ...otherProps}) {
    const isDisabled = disabled ? true : false;
    const getColor = (value) => {
        return '#' + value;
    }
    return (
        <Autocomplete options={options} disabled={isDisabled}
                      value={selectedValue ? selectedValue : null} fullWidth
                      onChange={(event, value) => setOption(value)}
                      getOptionLabel={(option) => option && option.name ? option.name : '-'}
                      renderInput={(params) => (
                          <TextField
                              disabled
                              {...params}
                              {...otherProps}
                          />)}
                      renderOption={(props, option) => (
                          <Stack direction="row" key={option.id}>
                              <Box width="100%" component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                                  {option.name}
                              </Box>
                              <Box width={100} style={{backgroundColor: getColor(option.hexColor)}}></Box>
                          </Stack>
                      )}
        />
    )
}

ColorAutocompleteControl.propTypes = {
    options: PropTypes.array.isRequired,
    selectedValue: PropTypes.object,
    setOption: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}
export default ColorAutocompleteControl;