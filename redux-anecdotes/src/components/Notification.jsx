import {useSelector} from 'react-redux';

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };
  const notifications = useSelector (state => state.notifications);
  return (
    notifications &&
    <div style={style}>
      {notifications}
    </div>
  );
};

export default Notification;
