import { ButtonHTMLAttributes } from "react";
import { ImSpinner10 } from "react-icons/im";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isLoading?: boolean;
}

export function Button({ label, isLoading, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="active:scale-95 flex items-center justify-center w-full mt-6 h-12 rounded-xl cursor-pointer bg-gradient-to-r from-[#4f46e5] to-[#c026d3] hover:opacity-75 transition-all duration-300"
    >
      {isLoading ? (
        <ImSpinner10 className="animate-spin text-3xl text-white" />
      ) : (
        label
      )}
    </button>
  );
}
