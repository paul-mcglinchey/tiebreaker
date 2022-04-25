import { createContext, useCallback, useMemo, useState } from "react";
import { IChildrenProps, INotification, Notification } from "../../models";
import { v4 as uuid } from 'uuid'

interface INotificationContext {
  getNotifications: () => INotification[],
  addNotification: (message: string, type: Notification) => void,
  removeNotification: (notificationId: string) => void
}

export const NotificationContext = createContext<INotificationContext>({
  getNotifications: () => [],
  addNotification: () => {},
  removeNotification: () => {}
});

export const NotificationProvider = ({ children }: IChildrenProps) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const getNotifications = () => notifications
  const addNotification = (message: string, type: Notification) => setNotifications(prev => [...prev, { _id: uuid(), message: message, type: type }])
  const removeNotification = (notificationId: string) => setNotifications(prev => prev.filter((s: INotification) => s._id !== notificationId))

  const contextValue = {
    getNotifications: useMemo(() => getNotifications, [getNotifications, notifications]),
    addNotification: useCallback((message: string, type: Notification) => addNotification(message, type), []),
    removeNotification: useCallback((notificationId: string) => removeNotification(notificationId), []),
  }

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  )
}