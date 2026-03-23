import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header
      id="navbar"
      className="flex items-center justify-between bg-[#ff0101bd] py-3 px-8"
    >
      <NavLink to="/" className="text-[1.5rem] font-bold tracking-[1px]">
        <p>BotB</p>
      </NavLink>
      <nav className="flex items-center gap-6">
        <NavLink to="/battle" className="font-bold">
          Battle
        </NavLink>
        <NavLink to="/characters">Characters</NavLink>
        {token ? (
          <>
            {/* TODO - Change NavLinks depending on what we decide the paths are */}
            <NavLink to="/create">Create Creature</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/me">Account</NavLink>
            <button onClick={logout}>Log out</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
