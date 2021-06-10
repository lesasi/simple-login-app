import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { createUser } from '../actions/crud-user';
import { history } from '../routers';

import CustomInput from './sub_components/CustomInput';

const CreateUser = () => {
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
            console.log(error);
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
        <div className="create-user">
            <h2>New User</h2>
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
                    placeholder="Username" 
                    id="username" 
                    required
                    setValue={setUsername}
                    value={username}
                    error_message={errorMsg['username']}
                />
                <CustomInput 
                    type="text" 
                    placeholder="Full Name" 
                    id="name" 
                    setValue={setName}
                    value={name}
                    error_message={errorMsg['name']}
                />
                <CustomInput 
                    type="text" 
                    placeholder="Age" 
                    id="age" 
                    setValue={setAge}
                    value={age}
                    error_message={errorMsg['age']}
                />
                <CustomInput 
                    type="password" 
                    placeholder="Password" 
                    id="password"
                    required={!reduxStates.googleId}
                    setValue={setPassword}
                    value={password}
                    error_message={errorMsg['password']}
                />
                    <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateUser;