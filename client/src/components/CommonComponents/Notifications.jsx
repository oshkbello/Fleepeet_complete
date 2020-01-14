import React from 'react'
import {NotificationManager} from 'react-notifications';
  export const  createNotification = (type,title,message) => {
        switch (type) {
          case 'info':
            NotificationManager.info('Info message');
            break;
          case 'success':
            NotificationManager.success(title, message,);
            break;
          case 'warning':
            NotificationManager.warning(title, message);
            break;
          case 'error':
            NotificationManager.error(title, message, 5000, () => {
              alert('callback');
            });
            break;
        }
    }