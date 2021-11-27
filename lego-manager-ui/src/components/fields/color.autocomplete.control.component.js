import {Autocomplete, Box, Stack, TextField} from "@mui/material";

function ColorAutocompleteControl({options, selectedValue, label, setOption, disabled, ...otherProps}) {
    const isDisabled = disabled ? true : false;
    const getColor = (value) => {
        return '#' + value;
    }
    return (
        <Autocomplete options={options} disabled={isDisabled}
                      value={selectedValue} fullWidth
                      onChange={(event, value) => setOption(value)}
                      getOptionLabel={(option) => option && option.name ? option.name : ''}
                      renderInput={(params) => (
                          <TextField
                              fullWidth
                              disabled
                              {...params}
                              {...otherProps}
                              label={label}
                          />)}
                      renderOption={(props, option) => (
                          <Stack direction="row" fullWidth>
                              <Box width="100%" component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                                  {option.name}
                              </Box>
                              <Box width={100} style={{backgroundColor: getColor(option.hexColor)}}></Box>
                          </Stack>
                      )}
        />
    )
}

export default ColorAutocompleteControl;