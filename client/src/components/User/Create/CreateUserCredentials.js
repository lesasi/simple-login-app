import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { createNewFirebaseUser } from '../../../actions/auth';
import { createUser } from '../../../actions/crud-user';
import { history } from '../../../routers';
import CustomInput from '../../sub_components/CustomInput';


const CreateUserCredentials = ({ classes }) => {

    const [email, setEmail] = useState('nevinusa@gmail.com');
    const [password, setPassword] = useState('test1234');
    
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const { fireBaseToken } = await createNewFirebaseUser(email, password);
            const { data } = await createUser({
                email,
                token: fireBaseToken
            });
            console.log(data)

            dispatch({
                type: 'INIT_USER',
                payload: {
                    user: data.user
                }
            });

            dispatch({
                type: 'NEW_MESSAGE',
                payload: {
                    message: 'Created account successfully!',
                    type: 'SUCCESS'
                }
            });
            // Redirect to home page
            history.push('/');
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
    }

    return (
        <div>
            <Typography component="h1" variant="h5" className={classes.mid}>
                Create User
            </Typography>
            <Typography component="p" variant="body1" className={classes.mid}>
                Enter your email and password to register
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
                    required
                    setValue={setPassword}
                    value={password}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default CreateUserCredentials;