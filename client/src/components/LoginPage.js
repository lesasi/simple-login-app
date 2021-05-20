import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import login from '../actions/login';
import { history } from '../routers';

const LoginPage = () => {
    const [username, setUsername] = useState('elena@gmail.com');
    const [password, setPassword] = useState('test1234');
    
    const dispatch = useDispatch();
    
    const reduxStates = useSelector((state) => {
        return {
            user: state.user,
        };
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await login(username, password);
        if(error) {
            console.log(error);
        }
        else if(data){
            console.log(data);
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: data.user
                }
            });
        }
        setUsername('');
        setPassword('');
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
                <div className='login-input'>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        id="email" 
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </div>
                <div className='login-input'>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
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