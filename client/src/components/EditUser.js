import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const EditUser = () => {

    const reduxStates = useSelector((state) => {
        return {
            user: state.user,
        };
    });

    const [email, setEmail] = useState(reduxStates.user.email);
    const [age, setAge] = useState(reduxStates.user.age);
    const [name, setName] = useState(reduxStates.user.name);
    // const [password, setPassword] = useState('');

    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await createUser({
            email,
            age,
            name,
            password
        });
        if(error) {
            console.log(error);
            return;
        }
        // redirect to home page
        history.push('/');
    }

    return(
        <div className="create-user">
            <h2>New User</h2>
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
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className='login-input'>
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
                    <input 
                        type="password" 
                        placeholder="Password" 
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                    <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EditUser;