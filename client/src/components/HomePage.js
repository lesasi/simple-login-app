import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import getUserDetails from '../actions/getUserDetails';
import logout from '../actions/logout';
import { history } from '../routers';

const HomePage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

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

    if(loading){
        return(
            <div>
                Loading...
            </div>
        );
    }


    return(
        <div className='home-page'>
            <div className="titlebar">
                <Link className='link' to='/edit-user'>
                    <div className="edit-user title-button link">
                        Edit user
                    </div>
                </Link>
                <div onClick={logoutUser} className="logout title-button">
                    Logout
                </div>
            </div>
            <div className="user-details">
                <h1>User Details</h1>
                <p>Name: {reduxStates.user.name}</p>
                <p>Email: {reduxStates.user.email}</p>
                <p>Age: {reduxStates.user.age}</p>
            </div>
        </div>
    );
};

export default HomePage;