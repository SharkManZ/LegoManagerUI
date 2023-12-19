import Box from "@mui/material/Box";
import {Button, Popover, Stack} from "@mui/material";
import React from "react";

function Actions({anchorElId, setAnchorElId, items}) {
    const openPopover = Boolean(anchorElId);
    const anchorEl = document.getElementById(anchorElId);

    const onClick = (item) => {
        item.onClick();
        setAnchorElId(null);
    }

    return (
        <Popover id="actionPopover"
                 open={openPopover}
                 anchorEl={anchorEl}
                 onClose={() => setAnchorElId(null)}
                 anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'left',
                 }}>
            <Box m={2}>
                <Stack direction="column" spacing={2}>
                    {items !== undefined ? items.map((item) => (
                        <Button key={item.key} variant="contained" onClick={() => onClick(item)}>{item.title}</Button>
                    )) : {}}
                </Stack>
            </Box>
        </Popover>
    )
}

export default Actions;