import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-500 mb-1">
        {label}
      </label>
      <input
        ref={ref}
        {...props}
        className={`w-full border rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
);

Input.displayName = "Input";
export default Input;
