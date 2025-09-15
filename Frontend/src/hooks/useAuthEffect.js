import { useAuth } from '@auth/context/AuthContext';
import { useEffect } from 'react';

const useAuthEffect = (callback, deps = []) => {
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user?.need_verify_2fa !== true) {
      return callback();
    }
  }, [isAuthenticated, user, ...deps]);
};

export default useAuthEffect;
