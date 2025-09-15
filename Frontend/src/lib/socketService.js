import { apiConfig, reverbConfig } from '@/config/config';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

class SocketService {

  constructor() {
    this.echo = null;
  }

  init(){
    this.echo = new Echo({
      cluster: '',
      broadcaster: 'pusher',
      key: reverbConfig.APP_KEY,
      wsHost: reverbConfig.HOST,
      wsPort: reverbConfig.PORT,
      wssPort: reverbConfig.PORT,
      forceTLS: false,
      disableStats: true,
      enabledTransports: ['ws'],
      authEndpoint: `${apiConfig.API_URL}/api/broadcasting/auth`,
      auth: {
        withCredentials: true,
      }
    });  
  }

  subscribe(channelName) {
    return this.echo?.channel(channelName);
  }

  subscribeToPrivate(channelName) {
    return this.echo?.private(channelName);
  }

  subscribeToPresence(channelName) {
    return this.echo?.presence(channelName);
  }

  unsubscribe(channelName) {
    this.echo?.leave(channelName);
  }

  disconnect() {
    if (this.echo) {
      this.echo.disconnect();
      this.echo = null;
    }  
  }
}

const socketService = new SocketService();
export default socketService;
