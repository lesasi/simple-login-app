import { auth, firebase, googleProvider } from '../utils/firebase-config';

import { axiosObj } from '../utils/axios';

const logout = async () => {
    try{
        await axiosObj.post('/logout');
        await auth.signOut()
        return { success: true } ;
    }catch(error){
        return { error: error.response.data };
    }
};

export default logout;