import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';

const PopupOverlay = ({ children }) => {
    const reduxStates = useSelector((state) => {
        return {
            utils: state.utils
        };
    });   

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    useEffect(() => {
        if(!reduxStates.utils.new_message) {
            return;
        }
        setOpen(false);
        setMessage(reduxStates.utils.message)
        setTimeout(() => {
            setOpen(true);
            dispatch({
                type: 'RESET_MESSAGE'
            })
        }, 0)
    }, [reduxStates.utils.new_message]);

    return (
        <React.Fragment>
            { children }
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={message}
                action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />
        </React.Fragment>
        
    );
};

export default PopupOverlay;