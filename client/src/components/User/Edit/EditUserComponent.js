import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import editUserAction from '../../../actions/functions/editUserAction';
import CustomInput from '../../sub_components/CustomInput';

const useStyles = makeStyles((theme) => ({
    edit: {
        width: '100%'
    },
    mid: {
        display: 'flex',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        justifyContent: 'center'
    },
    titlebar: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(2)
    }

}));

const EditUserComponent = () => {

    const reduxStates = useSelector((state) => {
        return {
            user: state.user,
        };
    });

    const classes = useStyles();
    const dispatch = useDispatch();

    const [age, setAge] = useState(reduxStates.user.age || '');
    const [name, setName] = useState(reduxStates.user.name || '');


    const onSubmit = async (e) => {
        e.preventDefault();
        
        let payload = {
            age: age !== '' ? age: null,
            name: name !== '' ? name: null
        };
        dispatch(editUserAction(payload));
    }

    return(
        <div className={classes.edit}>
            <div className={classes.titlebar}>
                <Link to="/" className="link">
                    <Button color="secondary">
                        <b>{'< Go back'}</b>
                    </Button>
                </Link>
            </div>
            <Typography component="h1" variant="h5" className={classes.mid}>
                Edit User
            </Typography>
            <h3>Email: {reduxStates.user.email}</h3>
            <form 
                className="login-form"
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
                    onClick={onSubmit}
                >
                    Save User
                </Button>
            </form>
            <div className={classes.footer}>
                <Link to="/change-password" className="link">
                    <Button color="primary">
                        <b>{'Change Password?'}</b>
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default EditUserComponent;