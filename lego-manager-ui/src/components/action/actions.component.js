import Box from "@mui/material/Box";
import {Button, Popover, Stack} from "@mui/material";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setActionAnchorElAction} from "../../store/reducer/crud.actions";

function Actions({branch, items}) {
    const anchorElId = useSelector(state => state[branch].actionAnchorEl);
    const openPopover = Boolean(anchorElId);
    const anchorEl = document.getElementById(anchorElId);
    const dispatch = useDispatch();
    return (
        <Popover id="actionPopover"
                 open={openPopover}
                 anchorEl={anchorEl}
                 onClose={() => dispatch(setActionAnchorElAction(null, branch))}
                 anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'left',
                 }}>
            <Box m={2}>
                <Stack direction="column" spacing={2}>
                    {items !== undefined ? items.map((item) => (
                        <Button key={item.title} variant="contained" onClick={item.onClick}>{item.title}</Button>
                    )) : {}}
                </Stack>
            </Box>
        </Popover>
    )
}

export default Actions;