import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import login from '../actions/login';
import { history } from '../routers';
import CustomInput from './sub_components/CustomInput';

const LoginPage = () => {
    const [username, setUsername] = useState('nevinusa@gmail.com');
    const [password, setPassword] = useState('test1234');
    const [errorMsg, setErrorMsg] = useState({
        username: '',
        password: ''
    });

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

    const dispatch = useDispatch();
    
    const reduxStates = useSelector((state) => {
        return {
            user: state.user,
        };
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await login(username, password);
        console.log(error)
        setErrorMsgDefault();
        if(error) {
            const errorDesc = JSON.parse(error.error);
            updateErrorMsg(errorDesc['key'], errorDesc['message']);
        }
        else if(data){
            dispatch({
                type: 'INIT_USER',
                payload: {
                    user: data.user
                }
            });
        }
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
                    placeholder="Email" 
                    id="email" 
                    required
                    setValue={setUsername}
                    value={username}
                    error_message={errorMsg['username']}
                />
                <CustomInput 
                    type="password" 
                    placeholder="Password" 
                    id="password"
                    required
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
        </div>
    );
};

export default LoginPage;