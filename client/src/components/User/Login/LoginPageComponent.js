import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import loginUserAction from '../../../actions/functions/loginUserAction';
import loginUserPopupAction from '../../../actions/functions/loginUserPopupAction';
import CustomInput from '../../sub_components/CustomInput';
import GoogleProviderButton from '../Providers/Google/GoogleProviderButton';
import FacebookProviderButton from '../Providers/Facebook/FacebookProviderButton';
import GithubProviderButton from '../Providers/Github/GithubProviderButton';

const useStyles = makeStyles((theme) => ({
    login: {
        width: '100%'
    },
    mid: {
        display: 'flex',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        alignItems: 'center',
        flexDirection: 'column'
    },
    side: {
        display: 'flex',
        marginTop: theme.spacing(2),
        justifyContent: 'flex-end'
    },
    half: {
        width: '50%'
    },
}));

const LoginPageComponent = () => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    
    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUserAction(email, password));
    }
    
    const firebaseLoginSubmit = async (provider_name) => {
        dispatch(loginUserPopupAction(provider_name));    
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
                <GoogleProviderButton
                    className={classes.half}
                    onClick={() => firebaseLoginSubmit('google')}
                    label="Login using Google"
                />
                <FacebookProviderButton
                    className={classes.half}
                    onClick={() => firebaseLoginSubmit('facebook')}
                    label="Login using Facebook"
                />
                <GithubProviderButton
                    className={classes.half}
                    onClick={() => firebaseLoginSubmit('github')}
                    label="Login using GitHub"
                />
            </div>
        </div>
    );
};

export default LoginPageComponent;