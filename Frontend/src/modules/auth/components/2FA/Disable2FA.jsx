import React from 'react';
import { useAuth } from '@auth/context/AuthContext';
import { useTranslation } from 'react-i18next';
import PasswordVerification from '../PasswordVerification';
import useModal from '@/hooks/useModal';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Disable2FA = () => {

  const { t } = useTranslation();
  const { disable2FA } = useAuth();
  const { isOpen, open, close } = useModal();
  
  const handleDisable2FA = async (data) => {

    close();
    try {
      const response = await disable2FA(data);
      toast.success(response?.message);

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <>
      <Button
        onClick={open} 
        className="destructive"
      >
        Disable 2FA
      </Button>

      <PasswordVerification 
        isOpen={isOpen}
        onClose={close}
        onVerify={handleDisable2FA}
      />
    </>
  )
}

export default Disable2FA;
