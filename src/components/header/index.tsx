import { useNavigate } from "react-router-dom";
import { profile } from "../../constants/header";
import { useAuth } from "../../hooks";
import { Action, HeaderContainer, HeaderContent, Profile } from "./styles";
import { BiLogIn } from "react-icons/bi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
export function Header() {
  const { loadingAuth, signed, user } = useAuth();
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/login");
  }
  return (
    <HeaderContainer>
      <HeaderContent>
        <Profile>
          <a href="/">
            <img
              src={
                !user
                  ? profile.img
                  : "https://vocesabianime.com/wp-content/uploads/2023/07/Explicando-os-Poderes-de-Satoru-Gojo-1133x637-1.jpg"
              }
              alt="ig.news"
            />
          </a>
          <span>{!user ? "Visitante" : user.name}</span>
        </Profile>
        <Action>
          <button>
            <MdOutlineFavoriteBorder
              size={24}
              color={"#fff"}
              cursor={"pointer"}
            />
          </button>
          {!loadingAuth && signed && (
            <button onClick={handleLogin}>
              <BiLogIn size={24} color={"#fff"} cursor={"pointer"} />
            </button>
          )}
        </Action>
      </HeaderContent>
    </HeaderContainer>
  );
}
