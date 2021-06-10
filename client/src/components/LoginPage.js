import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import login from '../actions/login';
import googleLogin from '../actions/googleLogin';
import { history } from '../routers';
import CustomInput from './sub_components/CustomInput';

const LoginPage = () => {
    const [username, setUsername] = useState('nevinusa');
    const [password, setPassword] = useState('test1234');
    const [errorMsg, setErrorMsg] = useState({
        username: '',
        password: ''
    });
    
    const dispatch = useDispatch();

    const setErrorMsgDefault = () => {
        setErrorMsg(prevState => ({
            ...prevState,
            username: '',
            password: ''
        }));
    }

    const updateErrorMsg = (key, message) => {
        setErrorMsg(prevState => ({
            ...prevState,
            [key]: message
        }));
    }

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
            }         
        } catch (error) {
            console.log(error)
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
        setErrorMsgDefault();

        if(error) {
            error.error.forEach(errorDesc => {
                updateErrorMsg(errorDesc['key'], errorDesc['message']);
            });
        }
        else if(data){
            dispatch({
                type: 'INIT_USER',
                payload: {
                    user: data.user
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
        <div className="login-page"> 
            <h2>Login</h2>
            <form 
                className="login-form"
                onSubmit={onSubmit}
            >   
                <CustomInput 
                    type="text" 
                    placeholder="Username" 
                    id="username" 
                    required
                    setValue={setUsername}
                    value={username}
                    error_message={errorMsg['username']}
                />
                <CustomInput 
                    type="password" 
                    placeholder="Password" 
                    id="password"
                    // required
                    setValue={setPassword}
                    value={password}
                    error_message={errorMsg['password']}
                />
                <div className="bottom-line">
                    <button type="submit">Submit</button>
                    <Link to = '/create-user' className="signup">
                        Sign Up!
                    </Link>
                </div>
            </form>
            <button onClick={googleLoginSubmit}>
                Google Login
            </button>
        </div>
    );
};

export default LoginPage;