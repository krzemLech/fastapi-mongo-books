import { useNotificationContext } from "../context/notificationContext";
import type { NotificationType } from "../context/notificationContext";

export const useNotification = () => {
  const { addNotification, removeNotification, clearAllNotifications } =
    useNotificationContext();

  const showSuccess = (message: string) => {
    addNotification("success", message);
  };

  const showError = (message: string) => {
    addNotification("error", message);
  };

  const showWarning = (message: string) => {
    addNotification("warning", message);
  };

  const showNotification = (type: NotificationType, message: string) => {
    addNotification(type, message);
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showNotification,
    removeNotification,
    clearAllNotifications,
  };
};
