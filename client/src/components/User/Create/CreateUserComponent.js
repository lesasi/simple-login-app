import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import CreateUserCredentials  from './CreateUserCredentials';

const useStyles = makeStyles((theme) => ({
    create: {
        width: '100%'
    },
    mid: {
        display: 'flex',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        justifyContent: 'center'
    }
}));

const CreateUserComponent = () => {
    const classes = useStyles();

    const renderCreateUserForms = () => {
        return (
            <CreateUserCredentials
                classes={classes}
            />
        );
    }

    return(
        <div className={classes.create}>
            { renderCreateUserForms() }
        </div>
    );
};

export default CreateUserComponent;