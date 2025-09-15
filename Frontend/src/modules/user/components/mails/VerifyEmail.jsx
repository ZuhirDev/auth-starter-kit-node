import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@user/context/UserContext';

const VerifyEmail = () => {

  const { verifyEmail } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const verify = async () => {
      const url = `verify-email${location.search}`;
      const response = await verifyEmail({ url });
      if(response) navigate('/user');
    }

    verify();

  }, [location.search, navigate, verifyEmail]);

  return (
    <div>

    </div>
  )
}

export default VerifyEmail;
