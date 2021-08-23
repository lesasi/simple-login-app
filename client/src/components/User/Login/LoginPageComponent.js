import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GoogleButton from 'react-google-button'; 

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import { googlePopupSignIn, firebaseLogin } from '../../../actions/auth';
import { loginUser } from '../../../actions/crud-user';
import { history } from '../../../routers';
import CustomInput from '../../sub_components/CustomInput';

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

const LoginPageComponent = () => {
    const classes = useStyles();

    const [email, setEmail] = useState('nevinusa@gmail.com');
    const [password, setPassword] = useState('test1234');
    
    const dispatch = useDispatch();

    const googleLoginSubmit = async () => {
        try {
            const { data, error } = await googlePopupSignIn();
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
        try {
            const { fireBaseToken } = await firebaseLogin(email, password);
            const { data } = await loginUser({
                token: fireBaseToken
            });

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
        // DEV
        // setEmail('');
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

export default LoginPageComponent;