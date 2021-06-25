import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GoogleButton from 'react-google-button'; 

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import { login } from '../actions/auth';
import { googleLogin } from '../actions/auth';
import { history } from '../routers';
import CustomInput from './sub_components/CustomInput';

const useStyles = makeStyles((theme) => ({
    login: {
        width: '100%'
    },
    mid: {
        display: 'flex',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        justifyContent: 'center'
    },
    side: {
        display: 'flex',
        marginTop: theme.spacing(2),
        justifyContent: 'flex-end'
    }
}));

const LoginPage = () => {
    const classes = useStyles();

    const [username, setUsername] = useState('lesasi');
    const [password, setPassword] = useState('test1234');
    
    const dispatch = useDispatch();

    const googleLoginSubmit = async () => {
        try {
            const { data, error } = await googleLogin();
            if(error) {
                throw new Error(error);
            }
            if(data.new_user) {
                dispatch({
                    type: 'SET_GOOGLE_TOKEN',
                    payload: {
                        token: data.googleId
                    }
                });
                history.push('/create-user');
            }else {
                dispatch({
                    type: 'INIT_USER',
                    payload: {
                        user: data.user
                    }
                });
                dispatch({
                    type: 'NEW_MESSAGE',
                    payload: {
                        message: 'Logged in!',
                        type: 'SUCCESS'
                    }
                });
            }         
        } catch (error) {
            dispatch({
                type: 'NEW_MESSAGE',
                payload: {
                    message: 'Google login failed...',
                    type: 'ERROR'
                }
            });
        }
        
    }
    
    const reduxStates = useSelector((state) => {
        return {
            user: state.user,
        };
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await login(username, password);

        if(error) {
            const err_message = (Array.isArray(error.error) ? error.error[0].message : error)
            dispatch({
                type: 'NEW_MESSAGE',
                payload: {
                    message: err_message,
                    type: 'ERROR'
                }
            });
        }
        else if(data){
            dispatch({
                type: 'INIT_USER',
                payload: {
                    user: data.user
                }
            });

            dispatch({
                type: 'NEW_MESSAGE',
                payload: {
                    message: 'Logged in!',
                    type: 'SUCCESS'
                }
            });
        }
        // DEV
        // setUsername('');
        // setPassword('');
    }

    if(reduxStates.user.logged_in){
        return <Redirect to="/"/>;
    }

    return(
        <div className={classes.login}> 
            <Typography component="h1" variant="h5" className={classes.mid}>
                Login
            </Typography>
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
                />
                <CustomInput 
                    type="password" 
                    label="Password" 
                    id="password"
                    setValue={setPassword}
                    value={password}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Sign In
                </Button>
            </form>
            <div className={classes.side}>
                <Link to = '/create-user' className="signup">
                    New User? Sign Up!
                </Link>
            </div>
            <div className={classes.mid}>
                <GoogleButton
                    className={classes.half}
                    onClick={googleLoginSubmit}
                    label="Login using Google"
                />
            </div>
        </div>
    );
};

export default LoginPage;