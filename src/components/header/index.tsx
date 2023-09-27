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
            <img src={profile.img} alt="ig.news" />
          </a>
          <span>{user && user.name}</span>
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
