import "../styles.css"
import { useNotification } from "../../NotificationContext";

const Notification = () => {
  const { notification } = useNotification();

  if(notification == null) {
    return (    
      <div className="notification">
        {notification}
      </div>
    );
  }
  
  return (
    <div className={`notification ${notification ? 'with-border' : ''}`}>
      {notification}
    </div>
  );
};

export default Notification;
