export const NotificationSuccess = ({message}) => {
  if (message === null) {
    return null;
  }
  return <div className="notification-success">{message}</div>;
};

export const NotificationFailure = ({message}) => {
  if (message === null) {
    return null;
  }
  return <div className="notification-failure">{message}</div>;
};
