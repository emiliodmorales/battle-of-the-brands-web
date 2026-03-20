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
        <NavLink to={"/battle"}>Battle</NavLink>
        <NavLink to="/characters">Characters</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        {token ? (
          <>
            <NavLink to={"/profile"}>Profile</NavLink>
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
