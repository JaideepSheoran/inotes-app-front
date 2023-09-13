import React, {useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function Logout() {
    const [state, dispatch] = useContext(UserContext);
    const navigate = useNavigate();
    const userLogout = async () => {
        try {
            const res = await fetch('/logout', {
                method: 'GET',
                headers : {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json'
                  },
                credentials: 'include'
            });

            if (res.status === 200) {
                const data = await res.json();
                // alert(data.message);
                dispatch({type : 'USER', payload: false});
                navigate('/authuser');
            } else {
                throw new Error({ message: 'Unable to Logout' });
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
      userLogout();
    }, []);
    
    return (
        <>
        </>
    )
}

export default Logout