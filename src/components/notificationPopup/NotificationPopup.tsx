import React, { useEffect, useState } from "react";
import styles from "./notificationPopup.module.css";

interface NotificationPopupProps {
  message: string;
  isVisible: boolean;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  message,
  isVisible,
}) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
    if (isVisible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div className={`${styles.notification} ${visible ? styles.show : ""}`}>
      {message}
    </div>
  );
};

export default NotificationPopup;
