// lib/toast.tsx
/** biome-ignore-all lint/style/noMagicNumbers: <explanation> */
/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: <explanation> */

import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  XCircle,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";

export type ToastOptions = {
  title?: string;
  description?: ReactNode;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick?: () => void;
  };
  onDismiss?: () => void;
  onAutoClose?: () => void;
};

// Base toast styles - Dark theme optimized
const getToastStyles = (variant: string) => {
  const isLight = document.documentElement.classList.contains("light"); // Reverse logic since dark is default

  const styles: Record<string, any> = {
    success: {
      style: {
        backgroundColor: isLight
          ? "var(--light-success-bg)"
          : "var(--success-bg)",
        color: isLight ? "var(--light-success-text)" : "var(--success-text)",
        border: `1px solid ${isLight ? "var(--light-success-border)" : "var(--success-border)"}`,
      },
    },
    warning: {
      style: {
        backgroundColor: isLight
          ? "var(--light-warning-bg)"
          : "var(--warning-bg)",
        color: isLight ? "var(--light-warning-text)" : "var(--warning-text)",
        border: `1px solid ${isLight ? "var(--light-warning-border)" : "var(--warning-border)"}`,
      },
    },
    error: {
      style: {
        backgroundColor: isLight ? "var(--light-error-bg)" : "var(--error-bg)",
        color: isLight ? "var(--light-error-text)" : "var(--error-text)",
        border: `1px solid ${isLight ? "var(--light-error-border)" : "var(--error-border)"}`,
      },
    },
    info: {
      style: {
        backgroundColor: isLight ? "var(--light-info-bg)" : "var(--info-bg)",
        color: isLight ? "var(--light-info-text)" : "var(--info-text)",
        border: `1px solid ${isLight ? "var(--light-info-border)" : "var(--info-border)"}`,
      },
    },
    loading: {
      style: {
        backgroundColor: isLight
          ? "var(--light-loading-bg)"
          : "var(--loading-bg)",
        color: isLight ? "var(--light-loading-text)" : "var(--loading-text)",
        border: `1px solid ${isLight ? "var(--light-loading-border)" : "var(--loading-border)"}`,
      },
    },
    action: {
      style: {
        backgroundColor: isLight
          ? "var(--light-action-bg)"
          : "var(--action-bg)",
        color: isLight ? "var(--light-action-text)" : "var(--action-text)",
        border: `1px solid ${isLight ? "var(--light-action-border)" : "var(--action-border)"}`,
      },
    },
  };

  return styles[variant] || {};
};

// Success Toast
export const successToast = (message: string, options?: ToastOptions) =>
  toast(message, {
    description: options?.description,
    duration: options?.duration || 4000,
    icon: <CheckCircle2 className="h-5 w-5" />,
    action: options?.action,
    cancel: options?.cancel,
    onDismiss: options?.onDismiss,
    onAutoClose: options?.onAutoClose,
    ...getToastStyles("success"),
  });

// Warning Toast
export const warningToast = (message: string, options?: ToastOptions) =>
  toast(message, {
    description: options?.description,
    duration: options?.duration || 5000,
    icon: <AlertTriangle className="h-5 w-5" />,
    action: options?.action,
    cancel: options?.cancel,
    onDismiss: options?.onDismiss,
    onAutoClose: options?.onAutoClose,
    ...getToastStyles("warning"),
  });

// Error Toast
export const errorToast = (message: string, options?: ToastOptions) =>
  toast(message, {
    description: options?.description,
    duration: options?.duration || 6000,
    icon: <XCircle className="h-5 w-5" />,
    action: options?.action,
    cancel: options?.cancel,
    onDismiss: options?.onDismiss,
    onAutoClose: options?.onAutoClose,
    ...getToastStyles("error"),
  });

// Info Toast
export const infoToast = (message: string, options?: ToastOptions) =>
  toast(message, {
    description: options?.description,
    duration: options?.duration || 4000,
    icon: <Info className="h-5 w-5" />,
    action: options?.action,
    cancel: options?.cancel,
    onDismiss: options?.onDismiss,
    onAutoClose: options?.onAutoClose,
    ...getToastStyles("info"),
  });

// Loading Toast
export const loadingToast = (
  message: string,
  options?: Omit<ToastOptions, "duration">
) => {
  return toast(message, {
    description: options?.description,
    duration: Number.POSITIVE_INFINITY, // Loading toasts should persist until dismissed
    icon: <Loader2 className="h-5 w-5 animate-spin" />,
    action: options?.action,
    onDismiss: options?.onDismiss,
    onAutoClose: options?.onAutoClose,
    ...getToastStyles("loading"),
  });
};

// Action Toast
export const actionToast = (
  message: string,
  options: ToastOptions & { action: { label: string; onClick: () => void } }
) =>
  toast(message, {
    description: options.description,
    duration: options.duration || 8000,
    icon: <Zap className="h-5 w-5" />,
    action: options.action,
    cancel: options.cancel,
    onDismiss: options.onDismiss,
    onAutoClose: options.onAutoClose,
    ...getToastStyles("action"),
  });

// Promise Toast (for async operations)
export const promiseToast = <T,>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
  },
  _options?: {
    successOptions?: ToastOptions;
    errorOptions?: ToastOptions;
  }
) =>
  toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
    style: getToastStyles("loading").style,
  });

// Utility functions
export const dismissToast = (id?: string | number) => toast.dismiss(id);

export const dismissAllToasts = () => toast.dismiss();
