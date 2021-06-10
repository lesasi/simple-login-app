import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { Link } from 'react-router-dom';

import editUser from '../actions/editUser';
import { history } from '../routers';
import CustomInput from './sub_components/CustomInput';

const EditUser = () => {

    const reduxStates = useSelector((state) => {
        return {
            user: state.user,
        };
    });

    const dispatch = useDispatch();

    const [username, setUsername] = useState(reduxStates.user.username);
    const [age, setAge] = useState(reduxStates.user.age);
    const [name, setName] = useState(reduxStates.user.name);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState({
        username: '',
        password: '',
        age: '',
        name: '',
    });

    const setErrorMsgDefault = () => {
        setErrorMsg(prevState => ({
            ...prevState,
            username: '',
            password: '',
            age: '',
            name: '',
        }));
    }

    const updateErrorMsg = (key, message) => {
        setErrorMsg(prevState => ({
            ...prevState,
            [key]: message
        }));
    }

    const [disablePassword, setDisablePassword] = useState(true);

    const togglePassword = (e) => {
        e.preventDefault();
        setDisablePassword(!disablePassword)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMsgDefault();
        
        let payload = {
            username,
            age,
            name
        };
        if(!disablePassword) {
            payload = {
                ...payload,
                password
            };
        }
        const { data, error } = await editUser(payload);
        if(error) {
            console.log(error);
            error.error.forEach(errorDesc => {
                updateErrorMsg(errorDesc['key'], errorDesc['message']);
            });
            return;
        }
        dispatch({
            type: 'EDIT_USER',
            payload: {
                data
            }
        });
        // redirect to home page
        history.push('/');
    }

    return(
        <div className="edit-user-page">
            <h2>Edit User Details</h2>
            <form 
                className="login-form"
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
                    required
                    setValue={setName}
                    value={name}
                    error_message={errorMsg['name']}
                />
                <CustomInput 
                    type="text" 
                    placeholder="Age" 
                    id="age" 
                    required
                    setValue={setAge}
                    value={age}
                    error_message={errorMsg['age']}
                />
                <div>
                    <button onClick={togglePassword}>Change Password?</button>
                </div>
                { disablePassword ? 
                    null :
                    (<CustomInput 
                        type="password" 
                        placeholder="New Password" 
                        id="password"
                        required
                        setValue={setPassword}
                        value={password}
                        error_message={errorMsg['password']}
                    />)
                }
                <button 
                    type="submit"
                    onClick={onSubmit}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EditUser;