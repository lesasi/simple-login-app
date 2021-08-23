import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GoogleButton from 'react-google-button'; 

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { firebaseLogout, setGoogleEmail } from '../actions/auth';
import { deleteUser, logoutUser } from '../actions/crud-user';
import { history } from '../routers';
import CustomDialog from './sub_components/CustomDialog';
import { auth } from '../utils/firebase-config';

const useStyles = makeStyles((theme) => ({
    home: {
        width: '100%'
    },
    half: {
        width: '50%',
    },
    mid: {
        display: 'flex',
        marginBottom: theme.spacing(2),
        alignItems: 'center',
        flexDirection: 'column'
    },
    title: {
        fontSize: 14
    },
    pos: {
        fontSize: 10
    },
    down: {
        marginBottom: theme.spacing(2)
    },
    root: {
        marginTop: theme.spacing(2)
    }
}));

const HomePage = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [disableGoogle, setDisableGoogle] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const reduxStates = useSelector((state) => {
        return {
            user: state.user
        };
    });   

    const logoutUserFn = async (e) => {
        e.preventDefault();
        try {
            await firebaseLogout();
            dispatch({
                type: 'NEW_MESSAGE',
                payload: {
                    message: 'Logged out successfully!',
                    type: 'SUCCESS'
                }
            });
            history.push('/login')
        } catch (error) {
            console.log(error);
            return;            
        }
    }

    const deleteUserSubmit = async (e) => {
        e.preventDefault();
        // prompt to ask whether to confirm deletion
        const { data, error } = await deleteUser();
        if(error){
            console.log(error);
            dispatch({
                type: 'NEW_MESSAGE',
                payload: {
                    message: 'Unable to delete user!',
                    type: 'ERROR'
                }
            });
            return;
        }
        dispatch({
            type: 'LOGOUT'
        });
        dispatch({
            type: 'NEW_MESSAGE',
            payload: {
                message: 'Deleted user!',
                type: 'SUCCESS'
            }
        });
        history.push('/login');
    }

    const setGoogleEmailSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await setGoogleEmail();
        if(error) {
            dispatch({
                type: 'NEW_MESSAGE',
                payload: {
                    message: 'Google integration failed!',
                    type: 'ERROR'
                }
            });
            return;
        }
        dispatch({
            type: 'NEW_MESSAGE',
            payload: {
                message: 'Google integration successful!',
                type: 'SUCCESS'
            }
        });
    }

    return(
        <div className={classes.home}>
            <div className="titlebar">
                <Link className='link' to='/edit-user'>
                    <div className="edit-user title-button link">
                        Edit user
                    </div>
                </Link>
                <div 
                    className="logout title-button link"
                    onClick={() => setOpenDeleteDialog(true)}
                >
                    Delete User
                </div>
                <div onClick={logoutUserFn} className="logout title-button">
                    Logout
                </div>
            </div>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.down} variant="h4" component="h2">
                        User Details
                    </Typography>
                    <Typography className={classes.down} variant="body2" component="p">
                        Email: {reduxStates.user.email}
                    </Typography>
                    <Typography className={classes.down} variant="body2" component="p">
                        Name: {reduxStates.user.name}
                    </Typography>
                    <Typography className={classes.down} variant="body2" component="p">
                        Age: {reduxStates.user.age}
                    </Typography>
                </CardContent>
                <div className={classes.mid}>
                    <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                        Want to connect your google account?
                    </Typography>
                    <GoogleButton
                        className={classes.half}
                        onClick={setGoogleEmailSubmit}
                        disabled={!!auth.currentUser}
                        label={
                            !!auth.currentUser ? 
                                'Logged in to Google':
                                'Sign in to Google'
                        }
                    >
                        Hello
                    </GoogleButton>
                </div>
                
            </Card>
            <CustomDialog 
                title='Delete account?'
                content='Are you sure you want to delete this account? It will be lost forever'
                denyMessage='No'
                acceptFunction={deleteUserSubmit}
                acceptMessage='Yes'
                open={openDeleteDialog}
                setOpen={setOpenDeleteDialog}
            />
        </div>
    );
};

export default HomePage;