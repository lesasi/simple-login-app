import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const CustomDialog = ({
    title,
    content,
    denyMessage,
    acceptFunction,
    acceptMessage,
    open, 
    setOpen
}) => {
    const executeAcceptFunction = async (e) => {
        await acceptFunction(e);
        console.log('dfssds')
        setOpen(false);
    }
    return(
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                    { denyMessage }
                </Button>
                <Button onClick={executeAcceptFunction} color="primary" autoFocus>
                    { acceptMessage }
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomDialog;