import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { createUser } from '../actions/crud-user';
import { history } from '../routers';

import CustomInput from './sub_components/CustomInput';

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

    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const reduxStates = useSelector((state) => {
        return {
            googleId: state.user.google_token
        };
    });  

    const [errorMsg, setErrorMsg] = useState({
        username: '',
        password: '',
        age: '',
        name: ''
    });

    const setErrorMsgDefault = () => {
        setErrorMsg(prevState => ({
            ...prevState,
            username: '',
            password: '',
            age: '',
            name: ''
        }));
    }

    const updateErrorMsg = (key, message) => {
        setErrorMsg(prevState => ({
            ...prevState,
            [key]: message
        }));
    }

    const resetParams = () => {
        setUsername('');
        setName('');
        setPassword('');
        setAge('');
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMsgDefault();

        const { data, error } = await createUser({
            username,
            age,
            name,
            password,
            googleId: reduxStates.googleId
        });
        if(error) {
            error.error.forEach(errorDesc => {
                updateErrorMsg(errorDesc['key'], errorDesc['message']);
            });
            // DEV
            // resetParams();
            return;
        }
        dispatch({
            type: 'INIT_USER',
            payload: {
                user: data.user
            }
        });

        // redirect to home page
        history.push('/');
    }

    return(
        <div className={classes.create}>
            <Typography component="h1" variant="h5" className={classes.mid}>
                New User
            </Typography>
            {
                reduxStates.googleId ? 
                <p>Add a few more details to complete the signin...</p>
                :null
            }
            <form 
                className="login-form"
                onSubmit={onSubmit}
            >   
                <CustomInput 
                    type="text" 
                    label="Username" 
                    id="username" 
                    required
                    setValue={setUsername}
                    value={username}
                    error_message={errorMsg['username']}
                />
                <CustomInput 
                    type="text" 
                    label="Full Name" 
                    id="name" 
                    setValue={setName}
                    value={name}
                    error_message={errorMsg['name']}
                />
                <CustomInput 
                    type="text" 
                    label="Age" 
                    id="age" 
                    setValue={setAge}
                    value={age}
                    error_message={errorMsg['age']}
                />
                <CustomInput 
                    type="password" 
                    label="Password" 
                    id="password"
                    required={!reduxStates.googleId}
                    setValue={setPassword}
                    value={password}
                    error_message={errorMsg['password']}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Create User
                </Button>
            </form>
        </div>
    );
};

export default CreateUser;