import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import CreateUserCredentials  from './CreateUserCredentials';
import CreateUserAdditionalDetails from './CreateUserAdditionalDetails';

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

const CreateUser = () => {
    const classes = useStyles();

    const [email, setEmail] = useState('nevinusa@gmail.com');
    const [token, setToken] = useState(null); 

    return(
        <div className={classes.create}>
            {
                token === null ?
                <CreateUserCredentials
                    setToken={setToken}
                    classes={classes}
                    setEmail={setEmail}
                    email={email}
                /> :
                <CreateUserAdditionalDetails
                    token={token}
                    classes={classes}
                    email={email}
                />
            }
        </div>
    );
};

export default CreateUser;