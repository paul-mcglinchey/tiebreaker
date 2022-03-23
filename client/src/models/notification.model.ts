enum NotificationType {
  SUCCESS, INFO, ERROR, WARNING
}

export interface INotification {
  type: NotificationType,
  timer: number,
  title: string,
  subtitle: string
}