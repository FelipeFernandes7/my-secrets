import { useEffect, useState } from "react";
import { Input } from "../../components/input";
import { useAuth, useNote } from "../../hooks";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { z } from "zod";
import { BsArrowLeftShort } from "react-icons/bs";

import * as Chakra from "@chakra-ui/react";

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
  const { isVisible, changeVisibleState } = useNote();
  const [confPasswordIsVisible, setConfPasswordIsVisible] =
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
          }
        );
        setIsLoading(false);
      });
  }
  useEffect(() => {
    logOut();
  }, []);

  function handleShowConfPassword() {
    setConfPasswordIsVisible({
      type: confPasswordIsVisible.type === "password" ? "text" : "password",
    });
  }

  const handleNavigate = () => {
    navigate("/login", { replace: true });
  };

  return (
    <Chakra.Flex
      w={"100%"}
      h={"100vh"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
    >
      <Chakra.Flex
        w={"100%"}
        position={"fixed"}
        top={"1.5rem"}
        justifyContent={"flex-start"}
        pl={"1.5rem"}
      >
        <Chakra.Button
          onClick={handleNavigate}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          w={"3rem"}
          h={"3rem"}
          borderRadius={"50%"}
          border={"none"}
          cursor={"pointer"}
          fontWeight={"bold"}
          backgroundColor={"#6e72fc"}
          backgroundImage={"linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%)"}
          color={"#fff"}
          fontSize={"1.5rem"}
        >
          <Chakra.Icon as={BsArrowLeftShort} />
        </Chakra.Button>
      </Chakra.Flex>
      <Chakra.Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w={"100%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        pr={"1.5rem"}
        pl={"1.5rem"}
      >
        <Chakra.Text fontSize={"2rem"} fontWeight={"bold"}>
          Cadastro
        </Chakra.Text>
        <Chakra.Flex
          w={"100%"}
          maxW={"450px"}
          flexDirection={"column"}
          gap={"1rem"}
        >
          <Input
            name="name"
            type={"user"}
            label="Nome de usuário"
            placeholder={"Digite o nome de usuário"}
            register={register}
            error={errors.name}
          />
          <Input
            name="email"
            type={"email"}
            label="E-mail"
            placeholder={"Digite o seu e-mail"}
            register={register}
            error={errors.email}
          />
          <Input
            name="password"
            type={isVisible.type}
            label="Senha"
            handleSeePassword={changeVisibleState}
            placeholder={"Digite sua senha"}
            register={register}
            error={errors.password}
          />
          <Input
            name="confPassword"
            type={confPasswordIsVisible.type}
            label="Confirme senha"
            handleSeePassword={handleShowConfPassword}
            placeholder={"Confirme sua senha"}
            register={register}
            error={errors.confPassword}
          />
          <Chakra.Button
            type="submit"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            mt={"1.5rem"}
            h={"3rem"}
            cursor={"pointer"}
            borderRadius={"0.5rem"}
            backgroundColor={"#6e72fc"}
            backgroundImage={"linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%)"}
            color={"#fff"}
            _hover={{
              hover: "none",
            }}
            _disabled={{
              opacity: "0.5",
              cursor: "not-allowed",
            }}
          >
            {isLoading ? <Chakra.Spinner color="#fff" /> : "Salvar"}
          </Chakra.Button>
        </Chakra.Flex>
      </Chakra.Box>
    </Chakra.Flex>
  );
}
