import { NavLink } from "react-router";
import "../styles/navbar.css";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        <p>BotB</p>
      </NavLink>
      <nav>
        <NavLink to={"/battle"} className="battle-btn">
          Battle
        </NavLink>
        <NavLink to="/characters">Characters</NavLink>
        {token ? (
          <>
            {/* TODO - Change NavLinks depending on what we decide the paths are */}
            <NavLink to="/create">CreateCreature</NavLink>
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
