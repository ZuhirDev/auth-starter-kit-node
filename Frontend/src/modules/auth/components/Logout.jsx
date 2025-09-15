import React from 'react';
import { useAuth } from '@auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AUTH_ROUTES from '@auth/routes/paths';
import { useTranslation } from 'react-i18next';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Logout = ({ className }) => {

  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.clear()
      navigate(AUTH_ROUTES.HOME);
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className={`flex items-center justify-start w-full text-sm font-normal px-2 py-1.5 hover:bg-muted ${className}`}
    >
      <LogOut className="mr-2 h-4 w-4 text-red-500" />
      <span className="text-red-600">{t('auth:logout')}</span>
    </Button>
  )
}

export default Logout;
