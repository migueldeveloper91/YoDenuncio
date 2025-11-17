import { IonIcon } from "@ionic/react";
import React from "react";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "outline"
  | "ghost";

interface ButtonProps {
  children?: React.ReactNode;
  label?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: Variant;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: string; // Ionicon name (e.g., "checkmark", "trash", "arrow-forward")
  iconPosition?: "left" | "right"; // Position of the icon
  className?: string;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]",
  secondary:
    "bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-dark)]",
  danger:
    "bg-[var(--color-danger)] text-white hover:bg-[var(--color-danger-dark)]",
  success:
    "bg-[var(--color-success)] text-white hover:bg-[var(--color-success-dark)]",
  outline:
    "bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-50",
  ghost: "bg-transparent text-gray-800 hover:bg-gray-100",
};

export default function Button({
  children,
  label,
  type = "button",
  onClick,
  variant = "primary",
  disabled = false,
  isLoading = false,
  icon,
  iconPosition = "left",
  className = "",
}: ButtonProps) {
  const base =
    "w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2";
  const disabledCls =
    disabled || isLoading ? "opacity-50 cursor-not-allowed" : "";
  const variantCls = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;

  const renderContent = () => {
    const text = children ?? label;
    const iconEl = icon ? <IonIcon icon={icon} className="text-lg" /> : null;

    if (isLoading) {
      return (
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      );
    }

    if (iconPosition === "left") {
      return (
        <>
          {iconEl}
          {text}
        </>
      );
    }

    return (
      <>
        {text}
        {iconEl}
      </>
    );
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`${base} ${variantCls} ${disabledCls} ${className}`.trim()}
    >
      {renderContent()}
    </button>
  );
}
