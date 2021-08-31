import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

import logoutUserAction from '../../../actions/functions/logoutUserAction';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const LogoutContainer = () => {

    const dispatch = useDispatch();

    const logoutUserFn = async (e) => {
        e.preventDefault();
        dispatch(logoutUserAction());
    }

    return (
        <div>
            <ColorButton
                variant="contained"
                onClick={logoutUserFn}
            >
                Logout
            </ColorButton>
        </div>
    );
};

export default LogoutContainer;