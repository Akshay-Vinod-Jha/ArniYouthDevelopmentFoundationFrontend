import React, { useEffect } from "react";
import { X, CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info", // 'success', 'error', 'warning', 'info'
  children,
  showCloseButton = true,
  closeOnBackdrop = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle className="w-16 h-16 text-green-500" />,
    error: <XCircle className="w-16 h-16 text-red-500" />,
    warning: <AlertCircle className="w-16 h-16 text-yellow-500" />,
    info: <Info className="w-16 h-16 text-blue-500" />,
  };

  const borderColors = {
    success: "border-green-500",
    error: "border-red-500",
    warning: "border-yellow-500",
    info: "border-blue-500",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn"
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-scaleIn border-t-4 ${borderColors[type]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Content */}
        <div className="p-6 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">{icons[type]}</div>

          {/* Title */}
          {title && (
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {title}
            </h3>
          )}

          {/* Message */}
          {message && (
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {message}
            </p>
          )}

          {/* Custom Content */}
          {children && <div className="mb-6">{children}</div>}

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full btn btn-primary py-3 text-lg font-semibold"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
