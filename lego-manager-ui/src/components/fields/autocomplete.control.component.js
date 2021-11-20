import {Autocomplete, Box, TextField} from "@mui/material";

function AutocompleteControl({options, selectedValue, label, setOption}) {
    return (
        <Autocomplete options={options}
                      value={selectedValue}
                      onChange={(event, value) => setOption(value)}
                      getOptionLabel={(option) => option && option.name ? option.name : ''}
                      renderInput={(params) => (
                          <TextField
                              {...params}
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