import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import * as S from "./styles";
export function NoRegister() {
  return (
    <S.StyledNoRegister>
      <HiOutlineClipboardDocumentList size={90} />
      <p>Você não registrou nenhuma nota</p>
      <p>Crie uma agora!</p>
    </S.StyledNoRegister>
  );
}
