import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks";
import { z } from "zod";
import { BsShieldLockFill } from "react-icons/bs";

import toast from "react-hot-toast";
import { TextField } from "../../components/textField";
import { ImSpinner10 } from "react-icons/im";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, logOut } = useAuth();

  const schema = z.object({
    email: z
      .string()
      .email("Informe um e-mail válido")
      .nonempty("O e-mail é obrigatório"),
    password: z.string().nonempty("O campo senha é obrigatório"),
  });

  type FormData = z.infer<typeof schema>;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  function onSubmit(formData: FormData) {
    setIsLoading(true);
    const { email, password } = formData;
    signIn(email, password)
      .then(() => {
        toast.success("Login efetuado com sucesso", {
          position: "top-center",
          style: {
            background: "#232323",
            color: "#fff",
          },
        });

        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("E-mail ou Senhas incorretas", {
          position: "top-center",
          style: {
            background: "#232323",
            color: "#fff",
          },
        });
        setIsLoading(false);
      });
  }

  useEffect(() => {
    logOut();
  }, []);

  return (
    <div className=" w-full flex flex-col md:flex-row overflow-hidden h-screen transition-all duration-300 ease-linear">
      <div className="flex flex-col w-full md:hidden ">
        <h1 className="flex items-center w-full justify-center gap-4 text-5xl font-bold whitespace-nowrap mt-6 text-center bg-gradient-to-r from-[#6e72fc] to-[#ad1deb] bg-clip-text text-transparent">
          My Secrets
          <BsShieldLockFill className="text-4xl text-white" />
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-1/2 flex flex-col items-center px-6 h-screen mt-[20vh]"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4f46e5] to-[#c026d3] bg-clip-text text-transparent">
          Login
        </h1>
        <section className="w-full flex md:max-w-[450px] flex-col items-center gap-4">
          <TextField
            autoComplete="off"
            name="email"
            label="E-mail"
            type={"email"}
            placeholder="Entrar com e-mail..."
            error={errors.email}
            register={register}
          />
          <TextField
            autoComplete="off"
            label="Senha"
            name="password"
            type={"password"}
            placeholder="Entrar com a senha"
            register={register}
            error={errors.password}
          />
          <button
            type="submit"
            className="active:scale-95 flex items-center justify-center w-full mt-6 h-12 rounded-xl cursor-pointer bg-gradient-to-r from-[#4f46e5] to-[#c026d3] hover:opacity-75 transition-all duration-300"
          >
            {isLoading ? (
              <ImSpinner10 className="animate-spin text-3xl text-white" />
            ) : (
              "Entrar"
            )}
          </button>
        </section>
        <h3 className="mt-6 gap-2 flex items-center text-center text-white">
          Ainda não tem uma conta?
          <Link className="text-[#4f46e5]" to={"/register"}>
            Cadastre-se
          </Link>
        </h3>
      </form>
      <section className="hidden md:block w-[50%] h-screen bg-gradient-to-r from-[#4f46e5] to-[#c026d3]">
        <div className="flex flex-col h-full justify-center items-center text-center gap-3 text-5xl">
          My Secrets
          <BsShieldLockFill className="text-4xl text-white" />
        </div>
      </section>
    </div>
  );
}
