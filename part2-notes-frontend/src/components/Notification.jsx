export const Notification = ({message}) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};
export const NotificationSuccess = ({message}) => {
  return <Notification message={message} className=".notification-success" />;
};
