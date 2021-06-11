import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { logout } from '../actions/auth';
import { deleteUser } from '../actions/crud-user';
import { history } from '../routers';
import CustomDialog from './sub_components/CustomDialog';

const useStyles = makeStyles((theme) => ({
    home: {
        width: '100%'
    },
    mid: {
        display: 'flex',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        justifyContent: 'center'
    },
    title: {
        fontSize: 14
    },
    pos: {
        fontSize: 12
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
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const reduxStates = useSelector((state) => {
        return {
            user: state.user
        };
    });   

    const logoutUser = async (e) => {
        e.preventDefault();
        const { success, error } = await logout();
        if(error){
            console.log(error);
            return;
        }
        dispatch({
            type: 'LOGOUT'
        });
        history.push('/login')
    }

    const deleteUserSubmit = async (e) => {
        e.preventDefault();
        // prompt to ask whether to confirm deletion
        const { data, error } = await deleteUser();
        if(error){
            console.log(error);
            return;
        }
        console.log(data)
        dispatch({
            type: 'LOGOUT'
        });
        history.push('/login')
        
    }

    if(loading){
        return(
            <div>
                Loading...
            </div>
        );
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
                    onClick={setOpenDeleteDialog(true)}
                >
                    Delete User
                </div>
                <div onClick={logoutUser} className="logout title-button">
                    Logout
                </div>
            </div>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.down} variant="h4" component="h2">
                        User Details
                    </Typography>
                    <Typography className={classes.down} variant="body2" component="p">
                        Username: {reduxStates.user.username}
                    </Typography>
                    <Typography className={classes.down} variant="body2" component="p">
                        Name: {reduxStates.user.name}
                    </Typography>
                    <Typography className={classes.down} variant="body2" component="p">
                        Age: {reduxStates.user.age}
                    </Typography>
                </CardContent>
            </Card>
            <CustomDialog 
                title='Are you sure?'
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