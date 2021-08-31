import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import CustomDialog from '../../sub_components/CustomDialog';
import deleteUserAction from '../../../actions/functions/deleteUserAction';

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      },
    },
  }))(Button);

const DeleteUserContainer = () => {
    const dispatch = useDispatch();
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const deleteUserSubmit = async (e) => {
        e.preventDefault();
        dispatch(deleteUserAction());
    }

    return (
        <div>
            <ColorButton
                variant="contained"
                onClick={() => setOpenDeleteDialog(true)}
            >
                Delete User
            </ColorButton>
            <CustomDialog 
                title='Delete account?'
                content='Are you sure you want to delete this account? It will be lost forever'
                denyMessage='No'
                acceptFunction={deleteUserSubmit}
                acceptMessage='Yes'
                open={openDeleteDialog}
                setOpen={setOpenDeleteDialog}
            />
        </div>
    );
};

export default DeleteUserContainer;