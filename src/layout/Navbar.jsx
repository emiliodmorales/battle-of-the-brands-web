import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header
      id="navbar"
      className="flex items-center justify-between bg-[#ff0101bd] py-3 px-8"
    >
      <NavLink
        className="text-[1.5rem] font-bold font-[papyrus] tracking-[1px]"
        to="/"
      >
        <p>BotB</p>
      </NavLink>
      <nav className="flex items-center gap-6">
        <NavLink to={"/battle"}>Battle</NavLink>
        <NavLink to="/characters">Characters</NavLink>
        {token ? (
          <>
            <NavLink to="/characters/new">CreateCreature</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/profile">Account</NavLink>
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
