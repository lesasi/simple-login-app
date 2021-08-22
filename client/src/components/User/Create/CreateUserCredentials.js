import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { createNewFirebaseUser } from '../../../actions/auth';
import CustomInput from '../../sub_components/CustomInput';


const CreateUserCredentials = ({
    setToken,
    setEmail,
    email,
    classes
}) => {
    const [password, setPassword] = useState('test1234');
    
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const { fireBaseToken, user } = await createNewFirebaseUser(email, password);
            console.log(user);
            setToken(fireBaseToken);
        } catch (error) {
            const err_message = error.message;
            dispatch({
                type: 'NEW_MESSAGE',
                payload: {
                    message: err_message,
                    type: 'ERROR'
                }
            });
        }
    }

    return (
        <div>
            <Typography component="h1" variant="h5" className={classes.mid}>
                Enter Email and Password
            </Typography>
            <form 
                className="login-form"
                onSubmit={onSubmit}
            >   
                <CustomInput 
                    type="text" 
                    label="Email" 
                    id="email" 
                    required
                    setValue={setEmail}
                    value={email}
                />
                <CustomInput 
                    type="password" 
                    label="Password" 
                    id="password"
                    required
                    setValue={setPassword}
                    value={password}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default CreateUserCredentials;