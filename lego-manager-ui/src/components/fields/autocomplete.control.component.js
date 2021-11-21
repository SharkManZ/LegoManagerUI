import {Autocomplete, Box, TextField} from "@mui/material";

function AutocompleteControl({options, selectedValue, label, setOption, disabled, ...otherProps}) {
    const isDisabled = disabled ? true : false;
    return (
        <Autocomplete options={options} disabled={isDisabled}
                      value={selectedValue}
                      onChange={(event, value) => setOption(value)}
                      getOptionLabel={(option) => option && option.name ? option.name : ''}
                      renderInput={(params) => (
                          <TextField
                              disabled
                              {...params}
                              {...otherProps}
                              label={label}
                              value=""
                              inputProps={{
                                  ...params.inputProps,
                                  autoComplete: 'new-password', // disable autocomplete and autofill
                              }}
                          />)}
                      renderOption={(props, option) => (
                          <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                              {option.name}
                          </Box>
                      )}
        />
    )
}

export default AutocompleteControl;