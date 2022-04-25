import { Notification } from "./types/notification.type";

export interface INotification {
  _id: string,
  message: string,
  type: Notification
};