
import "./styles.css"

type NotificationProps = {
  notification: string;
};

const Notification = ({notification}: NotificationProps) => {
  return (
    <div className="notification">
      {notification}
    </div>
  );
};

export default Notification;
