import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    error: {
        backgroundColor: 'red'
    },
    success: {
        backgroundColor: 'green'
    }
}));

const PopupOverlay = ({ children }) => {
    const reduxStates = useSelector((state) => {
        return {
            utils: state.utils
        };
    });   

    const dispatch = useDispatch();
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [positionObj, setPositionObj] = useState({
        vertical: 'bottom',
        horizontal: 'left',
    });

    const setSnackBar = (type) => {
        let vertical;
        let horizontal;
        let messageType;

        switch (type) {
            case 'SUCCESS':{
                vertical = 'bottom';
                horizontal = 'left';
                messageType = 'success';
                break;
            }
            case 'ERROR':{
                vertical = 'top';
                horizontal = 'center';
                messageType = 'error';
                break;
            }
            default: {
                vertical = 'bottom';
                horizontal = 'left';
                messageType = '';
                break;
            }
        }
        setMessageType(messageType);
        setPositionObj(prevState => ({
            ...prevState,
            vertical,
            horizontal
        }));
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    useEffect(() => {
        setOpen(false);
        setMessage(reduxStates.utils.message);
        setSnackBar(reduxStates.utils.type);

        setTimeout(() => {
            setOpen(true);
        }, 200);
    }, [reduxStates.utils.new_message_toggle]);

    return (
        <React.Fragment>
            { children }
            <Snackbar
                anchorOrigin={positionObj}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={message}
                ContentProps={{
                    classes: {
                      root: classes[messageType]
                    }
                }}
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