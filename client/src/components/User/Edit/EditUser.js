import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { editUser } from '../../../actions/crud-user';
import { history } from '../../../routers';
import CustomInput from '../../sub_components/CustomInput';

const useStyles = makeStyles((theme) => ({
    edit: {
        width: '100%'
    },
    mid: {
        display: 'flex',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        justifyContent: 'center'
    },
    mid_air: {
        display: 'flex',
        alignItems: 'center'
    },
    two_third: {
        width: '66%'
    }
}));

const EditUser = () => {

    const reduxStates = useSelector((state) => {
        return {
            user: state.user,
        };
    });

    const classes = useStyles();
    const dispatch = useDispatch();

    const [email, setEmail] = useState(reduxStates.user.email);
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
            email,
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
            const err_message = (Array.isArray(error.error) ? error.error[0].message : error)
            dispatch({
                type: 'NEW_MESSAGE',
                payload: {
                    message: err_message,
                    type: 'ERROR'
                }
            });
            return;
        }
        dispatch({
            type: 'EDIT_USER',
            payload: {
                data
            }
        });

        dispatch({
            type: 'NEW_MESSAGE',
            payload: {
                message: 'Details saved!',
                type: 'SUCCESS'
            }
        });

        // redirect to home page
        history.push('/');
    }

    return(
        <div className={classes.edit}>
            <Typography component="h1" variant="h5" className={classes.mid}>
                Edit User
            </Typography>
            <form 
                className="login-form"
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
                    value={age||''}
                />
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <CustomInput 
                            type="password" 
                            label="New Password" 
                            id="password"
                            required
                            setValue={setPassword}
                            value={password}
                            disabled={disablePassword}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={togglePassword}
                            size='small'
                        >
                            Change Password?
                        </Button>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                >
                    Save User
                </Button>
            </form>
        </div>
    );
};

export default EditUser;