import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";
import { IoLogOutOutline } from "react-icons/io5";

export function Header() {
  const { user, logOut } = useAuth();
  const signed = !!user;

  return (
    <header className="w-full flex items-center justify-between px-8 h-20 bg-neutral-950">
      <Link to="/" className="text-3xl font-bold text-white">
        ⌘
      </Link>
      {signed && <h1 className="text-2xl font-bold text-white">{user.name}</h1>}
      {signed && (
        <button
          onClick={logOut}
          className="text-white p-2 bg-gradient-to-r from-[#4f46e5] to-[#c026d3] rounded-xl flex items-center justify-center active:scale-95 transition-all duration-300"
        >
          <IoLogOutOutline size={25} />
        </button>
      )}
    </header>
  );
}
