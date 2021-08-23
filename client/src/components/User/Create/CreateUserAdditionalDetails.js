import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { createUser } from '../../../actions/crud-user';
import CustomInput from '../../sub_components/CustomInput';

// TO BE REMOVED
const CreateUserAdditionalDetails = ({
    token,
    email,
    classes
}) => {
    const [age, setAge] = useState('');
    const [name, setName] = useState('');
    
    const dispatch = useDispatch();

    const resetParams = () => {
        setName('');
        setAge('');
    }

    useEffect(() => {
        dispatch({
            type: 'SET_CREATE_USER_PHASE',
            payload: {
                credPhase: true,
                addPhase: false
            }
        });
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await createUser({
                email,
                name,
                age,
                token
            });

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
                Additional Details
            </Typography>
            <form 
                className="login-form"
                onSubmit={onSubmit}
            >   
                <CustomInput 
                    type="text" 
                    label="Full Name" 
                    id="name" 
                    setValue={setName}
                    value={name}
                />
                <CustomInput 
                    type="text" 
                    label="Age" 
                    id="age" 
                    setValue={setAge}
                    value={age}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Create User
                </Button>
            </form>
        </div>
    );
};

export default CreateUserAdditionalDetails;