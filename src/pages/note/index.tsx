import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Feeling } from "../../components/feeling";

import { useAuth, useNote } from "../../hooks";
import { v4 as uuid } from "uuid";
import * as Chakra from "@chakra-ui/react";

type FeelingProps = {
  happy: boolean;
  sad: boolean;
  anxious: boolean;
  insecure: boolean;
  excited: boolean;
  afraid: boolean;
  disciplined: boolean;
  focused: boolean;
  unshakable: boolean;
};
const feelingObj = {
  happy: false,
  sad: false,
  anxious: false,
  insecure: false,
  excited: false,
  afraid: false,
  disciplined: false,
  focused: false,
  unshakable: false,
};
export function Note() {
  const [feeling, setFeeling] = useState<FeelingProps>(feelingObj);
  const [annotation, setAnnotation] = useState("");
  const [title, setTitle] = useState("");
  const { addNote } = useNote();
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleSubmitAnnotation(e: FormEvent) {
    e.preventDefault();
    if (annotation.trim().length > 0) {
      addNote({
        id: uuid(),
        feeling: feeling,
        title: title,
        annotation: annotation,
        author: user ? user.uid : "unknown author",
        created: new Date().toISOString(),
      });
      setAnnotation("");
      navigate("/");
    }
  }

  return (
    <Chakra.Flex
      w={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Chakra.Text
        display={"flex"}
        justifyContent={"center"}
        fontSize={"1.5rem"}
        fontWeight={"bold"}
      >
        <h1>Como foi seu dia hoje?</h1>
      </Chakra.Text>
      <Chakra.Box
        as="form"
        pl={"0.8rem"}
        pr={"0.8rem"}
        onSubmit={handleSubmitAnnotation}
        transition={"all linear 0.3s ease"}
        h={"100vh"}
        w={"100%"}
        mt={"1.5rem"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        background={"#181818"}
        borderRadius={{ base: "2rem 2rem 0 0", md: "2rem 2rem 0 0" }}
      >
        <Chakra.Text
          mb={"1.5rem"}
          mt={"1.5rem"}
          w={"100%"}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          Faça uma anotação!
        </Chakra.Text>
        <Chakra.Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={{ base: "100%", md: "65%" }}
          maxW={{
            base: "100%",
            xl: "65%",
            lg: "65%",
            sm: "100%",
            "2xl": "65%",
          }}
          gap={"1.5rem"}
        >
          <Chakra.Input
            bg={"#151515"}
            w={"100%"}
            h={"3rem"}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título"
            color={"white"}
            borderRadius={"0.5rem"}
            padding={"0.5rem"}
            fontFamily={"Montserrat"}
            _placeholder={{
              color: "white",
            }}
            border={"none"}
          />
          <Chakra.Textarea
            bg={"#151515"}
            border={"none"}
            value={annotation}
            onChange={(e) => setAnnotation(e.target.value)}
            placeholder="Registre sua nota..."
            outline={"none"}
            borderRadius={"0.5rem"}
            padding={"0.5rem"}
            fontFamily={"Montserrat"}
            resize={"none"}
            color={"white"}
            overflowY={"hidden"}
            transition={"height 0.3s ease"}
            _placeholder={{
              color: "white",
            }}
            _focus={{
              height: "10rem",
            }}
          />
        </Chakra.Flex>
        <Chakra.Flex
          flexDirection={"column"}
          w={"100%"}
          mt={"1.5rem"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Chakra.Text fontWeight={"bold"}>Sentimento?</Chakra.Text>
          <Chakra.Flex
            marginTop={"1.5rem"}
            w={{ md: "70%", sm: "100%" }}
            justifyContent={"center"}
            flexWrap={"wrap"}
            gap={"0.5rem"}
          >
            <AllFeelings />
          </Chakra.Flex>
        </Chakra.Flex>
        <Chakra.Flex
          flexDirection={"column"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          w={"100%"}
          h={"100%"}
          mb={"1.5rem"}
        >
          <Chakra.Button
            isDisabled={
              !annotation.trim().length || !title.trim().length ? true : false
            }
            type="submit"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            w={{ base: "100%", md: "30%" }}
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
            Enviar
          </Chakra.Button>
        </Chakra.Flex>
      </Chakra.Box>
    </Chakra.Flex>
  );
  function AllFeelings() {
    return (
      <>
        <Feeling
          isFeelingEnabled={feeling.happy}
          background="rgb(74 222 128)"
          description="Feliz"
          feelingState={() => setFeeling((f) => ({ ...f, happy: !f.happy }))}
        />
        <Feeling
          isFeelingEnabled={feeling.sad}
          background="rgb(220 38 38)"
          description="Triste"
          feelingState={() => setFeeling((f) => ({ ...f, sad: !f.sad }))}
        />
        <Feeling
          isFeelingEnabled={feeling.excited}
          background="rgb(34 197 94)"
          description="Alegre"
          feelingState={() =>
            setFeeling((f) => ({ ...f, excited: !f.excited }))
          }
        />
        <Feeling
          isFeelingEnabled={feeling.disciplined}
          background=" rgb(37 99 235)"
          description="Disciplinado"
          feelingState={() =>
            setFeeling((f) => ({ ...f, disciplined: !f.disciplined }))
          }
        />
        <Feeling
          isFeelingEnabled={feeling.anxious}
          background=" rgb(253 224 71)"
          description="Ansioso"
          feelingState={() =>
            setFeeling((f) => ({ ...f, anxious: !f.anxious }))
          }
        />
        <Feeling
          isFeelingEnabled={feeling.focused}
          background=" rgb(79 70 229)"
          description="Focado"
          feelingState={() =>
            setFeeling((f) => ({ ...f, focused: !f.focused }))
          }
        />
        <Feeling
          isFeelingEnabled={feeling.insecure}
          background=" rgb(245 158 11)"
          description="Inseguro"
          feelingState={() =>
            setFeeling((f) => ({ ...f, insecure: !f.insecure }))
          }
        />
        <Feeling
          isFeelingEnabled={feeling.unshakable}
          background=" rgb(219 39 119)"
          description="Inabalável"
          feelingState={() =>
            setFeeling((f) => ({ ...f, unshakable: !f.unshakable }))
          }
        />
        <Feeling
          isFeelingEnabled={feeling.afraid}
          background=" rgb(254 215 170)"
          description="Medo"
          feelingState={() => setFeeling((f) => ({ ...f, afraid: !f.afraid }))}
        />
      </>
    );
  }
}
