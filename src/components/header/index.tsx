import { useNavigate } from "react-router-dom";
import { profile } from "../../constants/header";
import { useAuth } from "../../hooks";
import { Action, HeaderContainer, HeaderContent, Profile } from "./styles";
import { BiLogIn } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

export function Header() {
  const { loadingAuth, user } = useAuth();
  const signed = !!user;
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/login");
  }
  return (
    <HeaderContainer>
      <HeaderContent>
        <Profile>
          <a href="/">
            <img src={user?.avatar || profile.img} alt="ig.news" />
          </a>
          <span>{user?.name}</span>
        </Profile>
        <Action>
          <button>
            <FiSettings size={24} color={"#fff"} cursor={"pointer"} />
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
