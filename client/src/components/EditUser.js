import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { Link } from 'react-router-dom';

import editUser from '../actions/editUser';
import { history } from '../routers';

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
    const [disablePassword, setDisablePassword] = useState(true);

    const togglePassword = (e) => {
        e.preventDefault();
        setDisablePassword(!disablePassword)
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        let payload = {
            username,
            age,
            name
        };
        if(!disablePassword) {
            payload = {
                ...payload,
                old_password: oldPassword,
                password
            };
        }
        const { data, error } = await editUser(payload);
        if(error) {
            console.log(error);
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
                <div className='login-input'>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        id="username" 
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </div>
                <div className='login-input'>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        id="name" 
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div className='login-input'>
                    <label htmlFor="age">Age</label>
                    <input 
                        type="text" 
                        placeholder="Age" 
                        id="age" 
                        required
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                    />
                </div>
                <div className='login-input'>
                    <label htmlFor="old_password">{disablePassword ? 'Password' : 'Current Password'}</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        id="old_password"
                        required
                        onChange={(e) => setOldPassword(e.target.value)}
                        value={oldPassword}
                        disabled={disablePassword}
                    />
                    <button onClick={togglePassword}>Change Password?</button>
                </div>
                { disablePassword ? 
                    null :
                    (<div className='login-input'>
                        <label htmlFor="password">New Password</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            id="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>)
                }
                <button 
                    type="submit"
                    onClick={onSubmit}
                >Submit</button>
            </form>
        </div>
    );
};

export default EditUser;