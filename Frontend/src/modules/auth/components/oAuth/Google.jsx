import React from 'react'
import MAIN_ROUTES from '@/routes/path'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@auth/context/AuthContext'

const Google = () => {
    const navigate = useNavigate();
    const { oAuth } = useAuth();

    const handleAuthGoogle = async (data) =>{
        const { credential } = data;

        try {
            const response = await oAuth({ provider: 'google', credential });

            navigate(MAIN_ROUTES.DASHBOARD);
        } catch (error) {
            console.log("Error", error);
        }
    }

    return (
        <div>
            <GoogleLogin 
                onSuccess={handleAuthGoogle}
                onError={() => console.log("Error auth Google")}
                useOneTap
            />
        </div>
    )
}

export default Google
