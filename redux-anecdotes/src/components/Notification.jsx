import {useContext} from 'react';
import {useReducer} from 'react';
import {useSelector} from 'react-redux';
import NotificationContext from '../context/NotificationContext';

const Notification = ({notifications}) => {
  const context = useContext (NotificationContext);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  return (
    context.notification &&
    <div style={style}>
      {context.notification}
    </div>
  );
};

export default Notification;
