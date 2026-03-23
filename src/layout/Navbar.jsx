import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        <p>BotB</p>
      </NavLink>
      <nav>
        {token && (
          <NavLink to={"/battle"} className="battle-btn">
            Battle
          </NavLink>
        )}
        <NavLink to="/characters">Characters</NavLink>
        {token ? (
          <button onClick={logout}>Log out</button>
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
