/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLProps } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { MdEmail } from "react-icons/md";

interface TextFieldProps extends HTMLProps<HTMLInputElement> {
  type: "email" | "text";
  label?: string;
  error?: FieldError | undefined;
  name?: string;
  register?: UseFormRegister<any>;
}

export function TextField({
  label,
  error,
  name,
  type,
  register,
  ...rest
}: TextFieldProps) {
  return (
    <div className="w-full flex flex-col">
      {!!label && (
        <label className="font-medium text-white text-sm" htmlFor={name}>
          {label}
        </label>
      )}
      <section
        className={`w-full h-14 md:h-11 mt-1 ${
          error ? "border-2 border-red-500" : "border-[1px] border-slate-600"
        } flex rounded-xl items-center px-4 bg-transparent justify-between`}
      >
        {register && name ? (
          <input
            className="w-full h-14 md:h-11 outline-none bg-transparent text-white"
            type={type}
            {...register(name)}
            {...(label ? { id: name } : {})}
            {...rest}
          />
        ) : (
          <input
            className="w-full h-14 md:h-11 outline-none bg-transparent text-white"
            type={type}
            {...(label ? { id: name } : {})}
            {...rest}
          />
        )}
        {type === "email" && (
          <div className="flex items-center ">
            <MdEmail
              className={`${error ? "text-red-500" : "text-slate-500"}`}
              size={24}
            />
          </div>
        )}
      </section>
      {!!error && (
        <p className="text-red-500 mt-2 font-medium text-xs">{error.message}</p>
      )}
    </div>
  );
}
