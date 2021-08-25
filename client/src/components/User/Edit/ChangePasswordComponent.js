import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CustomInput from '../../sub_components/CustomInput';
import changePasswordAction from '../../../actions/functions/changePasswordAction';

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
    }

}));

const ChangePasswordComponent = () => {

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    
    const classes = useStyles();
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(changePasswordAction(oldPassword, password));
    }

    return (
        <div className={classes.edit}>
            <div className={classes.titlebar}>
                <Link to="/" className="link">
                    <Button color="secondary">
                        <b>{'< Go back'}</b>
                    </Button>
                </Link>
            </div>
            <Typography component="h1" variant="h5" className={classes.mid}>
                Change password
            </Typography>
            <h4>Enter current password, as well as the new one</h4>
            <form 
                className="login-form"
            >   
                <CustomInput 
                    type="password" 
                    label="Current password(leave empty if not set)" 
                    id="oldPassword" 
                    setValue={setOldPassword}
                    value={oldPassword}
                />
                <CustomInput 
                    type="password" 
                    label="New password" 
                    id="password" 
                    setValue={setPassword}
                    value={password}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default ChangePasswordComponent;