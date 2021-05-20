import React, { useState, useEffect } from 'react';
import { Router, Route, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import getUserDetails from '../actions/getUserDetails';
import AppRouter, { history } from '../routers';

const App = () => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // to get user data - if none, redirect to login page
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const { data, error } = await getUserDetails();
            if(error){
                history.push('/login')
            }else {
                dispatch({
                    type: 'INIT_USER',
                    payload: {
                        ...data
                    }
                });
                setLoading(false);
            }
        }
        fetchUser();
    }, []);


    return(
        <div>
            <AppRouter />
        </div>
    );
};

export default App;