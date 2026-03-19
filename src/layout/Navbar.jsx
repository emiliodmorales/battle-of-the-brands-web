import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        <p>Homepage</p>
      </NavLink>
      <nav>
        <NavLink to="/characters">Characters</NavLink>
        {token ? (
          <>
            <NavLink to="/">CreateCreature</NavLink>
            <NavLink to="/">Favorites</NavLink>
            <NavLink to="/">Teams</NavLink>
            <NavLink to="/">Account</NavLink>
            <button onClick={logout}>Log out</button>
          </>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}
