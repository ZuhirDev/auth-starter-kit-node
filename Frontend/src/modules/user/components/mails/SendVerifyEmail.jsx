import React from 'react';
import { useUser } from '@user/context/UserContext';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import useLoading from '@/hooks/useLoading';

const SendVerifyEmail = () => {

  const { t } = useTranslation();
  const { sendVerifyEmail } = useUser();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleSendVerifyEmail = async () => {
    startLoading();

    try {
      const response = await sendVerifyEmail();
      toast.success(response?.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }finally{
      stopLoading();
    }
  }

  return (
    <>
      <Button
        type="button"
        onClick={handleSendVerifyEmail}
        disabled={isLoading}
        className="destructive"
      >
        {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' /> }
        Send Verification Email
      </Button> 
    </>
  );
}

export default SendVerifyEmail;
