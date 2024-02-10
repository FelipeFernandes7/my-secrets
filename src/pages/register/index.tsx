import { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { z } from "zod";
import { BsShieldLockFill } from "react-icons/bs";

import { TextField } from "../../components/textField";
import { ImSpinner10 } from "react-icons/im";

interface ConfPasswordVisible {
  type: "password" | "text";
}

const schema = z.object({
  name: z.string().nonempty("Campo nome é obrigatório"),
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .nonempty("O campo senha é obrigatório"),
  confPassword: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .nonempty("O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { signUpWithEmailAndPassword, logOut } = useAuth();

  useState<ConfPasswordVisible>({
    type: "password",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    const { email, password, name, confPassword } = formData;
    if (password !== confPassword) {
      toast.error("As senhas não conferem", {
        style: {
          backgroundColor: "#232323",
          color: "#fff",
        },
        position: "top-center",
      });
      setIsLoading(false);
      return;
    }
    await signUpWithEmailAndPassword(email, password, name)
      .then(() => {
        toast.success("Usuário cadastrado com sucesso", {
          style: {
            backgroundColor: "#232323",
            color: "#fff",
          },
          position: "top-center",
        });
        setIsLoading(false);
        setInterval(() => {
          navigate("/", { replace: true });
        }, 3000);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(
          "Houve um erro durante o cadastro, tente novamente mais tarde :(",
          {
            style: {
              backgroundColor: "#232323",
              color: "#fff",
            },
            position: "top-center",
          },
        );
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
        className="w-full md:w-1/2 flex flex-col items-center px-6 h-screen mt-[15vh]"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4f46e5] to-[#c026d3] bg-clip-text text-transparent">
          Crie sua conta
        </h1>
        <section className="w-full flex md:max-w-[450px] flex-col items-center gap-4">
          <TextField
            name="name"
            label="Nome"
            type={"text"}
            placeholder="John Doe"
            error={errors.name}
            register={register}
          />
          <TextField
            name="email"
            label="E-mail"
            type={"email"}
            placeholder="john@example.com"
            error={errors.email}
            register={register}
          />
          <TextField
            label="Senha"
            name="password"
            type={"password"}
            placeholder="Entrar com a senha"
            register={register}
            error={errors.password}
          />
          <TextField
            label="Confirme sua senha"
            name="confPassword"
            type={"password"}
            placeholder="Confirmar Senha"
            register={register}
            error={errors.confPassword}
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
          Já tem uma conta? fazer
          <Link className="text-[#4f46e5]" to={"/login"}>
            login
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
