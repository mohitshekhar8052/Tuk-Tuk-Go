import toast from 'react-hot-toast';

export const useNotification = () => {
  const showSuccess = (message: string) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#10B981',
        color: '#FFFFFF',
      },
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#EF4444',
        color: '#FFFFFF',
      },
    });
  };

  const showInfo = (message: string) => {
    toast(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#3B82F6',
        color: '#FFFFFF',
      },
    });
  };

  const showWarning = (message: string) => {
    toast(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#F59E0B',
        color: '#FFFFFF',
      },
    });
  };

  const showLoading = (message: string) => {
    return toast.loading(message, {
      position: 'top-right',
    });
  };

  const dismissToast = (toastId: string) => {
    toast.dismiss(toastId);
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showLoading,
    dismissToast,
  };
};

export default useNotification;
