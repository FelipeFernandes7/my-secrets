import { profile } from "../../constants/header";
import { Action, HeaderContainer, HeaderContent, Profile } from "./styles";
import { BiBell } from "react-icons/bi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Profile>
          <a href="/">
            <img src={profile.img} alt="ig.news" />
          </a>
          <span>{profile.name}</span>
        </Profile>
        <Action>
          <button>
            <MdOutlineFavoriteBorder
              size={24}
              color={"#fff"}
              cursor={"pointer"}
            />
          </button>
          <button>
            <BiBell size={24} color={"#fff"} cursor={"pointer"} />
          </button>
        </Action>
      </HeaderContent>
    </HeaderContainer>
  );
}
