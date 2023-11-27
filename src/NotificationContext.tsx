import React, { createContext, useContext, useState } from 'react';

interface NotificationContextProps {
  notification: string | null;
  setNotification: (newNotification: string | null) => void; // Explicitly define the function type
}

const NotificationContext = createContext<NotificationContextProps>({
  notification: null,
  setNotification: () => null,
});

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState<string | null>(null);

  const setNotificationWithTimeout = (notification: string | null, timeout: number = 3000) => {
    setNotification(notification);
  
    if (notification !== null) {
      setTimeout(() => {
        setNotification(null);
      }, timeout);
    }
  };

  return (
    <NotificationContext.Provider value={{ notification, setNotification: setNotificationWithTimeout }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);