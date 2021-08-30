import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { createNewFirebaseUser } from '../../../actions/auth';
import { createUser } from '../../../actions/crud-user';
import { history } from '../../../routers';
import CustomInput from '../../sub_components/CustomInput';
import createUserAction from '../../../actions/functions/createUserAction';

const CreateUserCredentials = ({ classes }) => {

    const [email, setEmail] = useState('nevinusa@gmail.com');
    const [password, setPassword] = useState('test1234');
    
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(createUserAction(email, password));
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