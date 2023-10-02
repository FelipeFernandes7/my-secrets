import { useEffect, useState } from "react";
import { Input } from "../../components/input";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, useNote } from "../../hooks";
import { z } from "zod";
import { BsShieldLockFill } from "react-icons/bs";
import * as Chakra from "@chakra-ui/react";

import toast from "react-hot-toast";

export function Login() {
  const { isVisible, changeVisibleState } = useNote();
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
        toast.error(error.message, {
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
    <Chakra.Flex
      h={"100vh"}
      flexDirection={{ md: "row", base: "column" }}
      w={"100%"}
    >
      <Chakra.Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        h={"100vh"}
        w={{ md: "50%", base: "100%" }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        pr={"1.5rem"}
        pl={"1.5rem"}
      >
        <Chakra.Text fontSize={"2rem"} fontWeight={"bold"}>
          <h1>Login</h1>
        </Chakra.Text>
        <Chakra.Flex
          w={"100%"}
          maxW={"450px"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Input
            name="email"
            label="E-mail"
            type={"email"}
            placeholder="Entrar com e-mail..."
            error={errors.email}
            register={register}
          />
          <Input
            label="Senha"
            type={isVisible.type}
            name="password"
            placeholder="Entrar com a senha"
            register={register}
            handleSeePassword={changeVisibleState}
            error={errors.password}
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
            {isLoading ? <Chakra.Spinner color="#fff" /> : "entrar"}
          </Chakra.Button>
        </Chakra.Flex>
        <Chakra.Text mt={"1.5rem"} textAlign={"center"}>
          Ainda não tem uma conta?{" "}
          <Link style={{ color: "#ad1deb" }} to={"/register"}>
            Cadastre-se
          </Link>
        </Chakra.Text>
      </Chakra.Box>
      <Chakra.Flex
        w={"50%"}
        height={"100vh"}
        display={{ base: "none", md: "block" }}
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"#6e72fc"}
        backgroundImage={"linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%)"}
      >
        <Chakra.Flex
          display={"flex"}
          h={"100%"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          textAlign={"center"}
          fontSize={"4.5rem"}
          gap={".5rem"}
        >
          My Secrets
          <Chakra.Icon as={BsShieldLockFill} />
        </Chakra.Flex>
      </Chakra.Flex>
    </Chakra.Flex>
  );
}
