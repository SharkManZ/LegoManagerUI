import {Button, Dialog, DialogActions, DialogContent, Typography} from "@mui/material";
import React from "react";

function ConfirmDialog({message, open, closeDialog, onConfirm}) {

    return (
        <Dialog open={open} fullWidth onClose={closeDialog}>
            <DialogContent>
                <Typography>{message}?</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => onConfirm()}>Ok</Button>
                <Button variant="contained" onClick={closeDialog}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog;