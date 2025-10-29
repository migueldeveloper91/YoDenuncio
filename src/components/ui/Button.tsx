interface ButtonProps {
  label: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export default function Button({
  label,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
    >
      {label}
    </button>
  );
}
