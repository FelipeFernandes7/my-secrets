import { useNavigate } from "react-router-dom";
import { Card } from "../../components/card";
import { Container } from "../../components/container";
import { AddBtn, HomeContainer } from "./styles";
import { MdAdd } from "react-icons/md";

export function Home() {
  const navigate = useNavigate();
  function handleAddNewDaily() {
    navigate("/daily");
  }
  return (
    <HomeContainer>
      <Container>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Container>
      <AddBtn onClick={handleAddNewDaily}>
        <MdAdd color="#fff" size={24} />
      </AddBtn>
    </HomeContainer>
  );
}
