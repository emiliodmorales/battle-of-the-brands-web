import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        <p>Homepage</p>
      </NavLink>
      <NavLink to={"/battle"}>Battle</NavLink>
      <nav>
        <NavLink to="/characters">Characters</NavLink>
        {token ? (
          <>
            {/* TODO - Change NavLinks depending on what we decide the paths are */}
            <NavLink to="/create">CreateCreature</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/me">Account</NavLink>
            <button onClick={logout}>Log out</button>
          </>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}
