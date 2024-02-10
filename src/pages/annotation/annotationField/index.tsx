/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLProps } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface MessageProps extends HTMLProps<HTMLTextAreaElement> {
  label?: string;
  error?: FieldError | undefined;
  name?: string;
  register?: UseFormRegister<any>;
}

export function AnnotationField({
  label,
  error,
  name,
  register,
  ...rest
}: MessageProps) {
  return (
    <div className="w-full flex flex-col">
      {!!label && (
        <label className="font-medium text-white text-sm" htmlFor={name}>
          {label}
        </label>
      )}
      <section
        className={`w-full mt-1 ${
          error ? "border-2 border-red-500" : "border-[1px] border-slate-600"
        } flex rounded-xl items-center bg-transparent justify-between`}
      >
        {register && name ? (
          <textarea
            className="w-full outline-none bg-transparent text-white p-2 h-auto resize-none overflow-hidden "
            {...register(name)}
            {...(label ? { id: name } : {})}
            {...rest}
          />
        ) : (
          <textarea
            className="w-full outline-none bg-transparent text-white p-2 h-auto resize-none overflow-hidden "
            {...(label ? { id: name } : {})}
            {...rest}
          />
        )}
      </section>
      {!!error && (
        <p className="text-red-500 mt-2 font-medium text-xs">{error.message}</p>
      )}
    </div>
  );
}
