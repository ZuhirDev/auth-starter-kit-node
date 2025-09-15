import { get } from '@/utils/xhr';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import socketService from '@/lib/socketService';
import { toast } from 'sonner';
import { useAuth } from '@auth/context/AuthContext';

const Notification = () => {

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    socketService.init();

    const channel = socketService.subscribeToPrivate(`notification.private.${user.id}`);

    channel.listen('.notificationPrivate-sended', (e) => {
      toast.success(e.message)
    });

    return () => socketService.unsubscribe(`notification.private.${user.id}`);

  }, []);

  const sendNotification = async () => {
    setLoading(true);
    try {
      const response = await get({ url: '/notification' });

    } catch (error) {
      console.log("Error: ", error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={sendNotification} disabled={loading}>
        {loading ? "Enviando..." : "Enviar Notificación"}
      </Button>
    </>
  )
}

export default Notification
