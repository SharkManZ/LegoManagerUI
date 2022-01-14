import {Button, Dialog, DialogActions, DialogContent, Typography} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

function ConfirmDialog({message, open, closeDialog, onConfirm}) {

    return (
        <Dialog open={open} fullWidth onClose={closeDialog}>
            <DialogContent>
                <Typography>{message}?</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onConfirm}>Ok</Button>
                <Button variant="contained" onClick={closeDialog}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

ConfirmDialog.propTypes = {
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
}

export default ConfirmDialog;