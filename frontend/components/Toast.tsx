"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface ToastProps {
  message: string;
  type: "success" | "error" | "loading";
  duration?: number;
}

export default function Toast({ message, type, duration = 4000 }: ToastProps) {
  useEffect(() => {
    switch (type) {
      case "success":
        toast.success(message, { duration });
        break;
      case "error":
        toast.error(message, { duration });
        break;
      case "loading":
        toast.loading(message, { duration: 0 });
        break;
    }
  }, [message, type, duration]);

  return null;
}
