import React, { useEffect } from "react";
import classNames from "classnames";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = "info",
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const renderIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="icon success" size={20} />;
      case "error":
        return <XCircle className="icon error" size={20} />;
      case "warning":
        return <AlertTriangle className="icon warning" size={20} />;
      case "info":
      default:
        return <Info className="icon info" size={20} />;
    }
  };

  return (
    <div className={classNames("notification-container", type)}>
      {renderIcon()}
      <p>{message}</p>
    </div>
  );
};

export default Notification;
