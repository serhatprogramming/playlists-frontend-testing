const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  const notificationClassName =
    notification.type === "warning" ? "warning" : "info";

  return (
    <div className={`notification ${notificationClassName}`}>
      {notification.message}
    </div>
  );
};

export default Notification;
