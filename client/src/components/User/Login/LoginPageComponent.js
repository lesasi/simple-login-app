import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GoogleButton from 'react-google-button'; 

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import { googlePopupSignIn } from '../../../actions/auth';
import loginUserAction from '../../../actions/functions/loginUserAction';
import { history } from '../../../routers';
import CustomInput from '../../sub_components/CustomInput';
import loginUserPopupAction from '../../../actions/functions/loginUserPopupAction';

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
    
    const reduxStates = useSelector((state) => {
        return {
            user: state.user,
        };
    });
    
    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUserAction(email, password));
    }
    
    const firebaseLoginSubmit = async (provider_name) => {
        dispatch(loginUserPopupAction(provider_name));    
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
                    onClick={() => firebaseLoginSubmit('google')}
                    label="Login using Google"
                />
            </div>
        </div>
    );
};

export default LoginPageComponent;