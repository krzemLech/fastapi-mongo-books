import {
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  X,
} from "lucide-react";
import type { Notification } from "../context/notificationContext";

interface AlertBoxProps {
  notification: Notification;
  onClose: (id: string) => void;
}

const getNotificationStyles = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return {
        container:
          "bg-green-50 dark:bg-green-500/10 dark:outline dark:outline-green-500/20",
        icon: CheckCircleIcon,
        iconColor: "text-green-400",
        textColor: "text-green-800 dark:text-green-200",
        closeButtonColor:
          "text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300",
      };
    case "error":
      return {
        container:
          "bg-red-50 dark:bg-red-500/10 dark:outline dark:outline-red-500/20",
        icon: XCircleIcon,
        iconColor: "text-red-400",
        textColor: "text-red-800 dark:text-red-200",
        closeButtonColor:
          "text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300",
      };
    case "warning":
      return {
        container:
          "bg-yellow-50 dark:bg-yellow-500/10 dark:outline dark:outline-yellow-500/20",
        icon: AlertTriangleIcon,
        iconColor: "text-yellow-400",
        textColor: "text-yellow-800 dark:text-yellow-200",
        closeButtonColor:
          "text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300",
      };
    default:
      return {
        container:
          "bg-gray-50 dark:bg-gray-500/10 dark:outline dark:outline-gray-500/20",
        icon: CheckCircleIcon,
        iconColor: "text-gray-400",
        textColor: "text-gray-800 dark:text-gray-200",
        closeButtonColor:
          "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
      };
  }
};

export default function AlertBox({ notification, onClose }: AlertBoxProps) {
  const styles = getNotificationStyles(notification.type);
  const IconComponent = styles.icon;

  return (
    <div
      className={`rounded-md p-4 py-3 shadow-sm max-w-lg mb-2 ${styles.container}`}
    >
      <div className="flex">
        <div className="shrink-0">
          <IconComponent
            aria-hidden="true"
            className={`size-5 ${styles.iconColor}`}
          />
        </div>
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-medium ${styles.textColor}`}>
            {notification.message}
          </h3>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className={`inline-flex rounded-md p-1.5 transition-colors ${styles.closeButtonColor}`}
              onClick={() => onClose(notification.id)}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
