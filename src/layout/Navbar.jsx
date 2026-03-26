import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout, profile } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      id="navbar"
      className="flex items-center justify-between bg-[#ee0101] py-3 px-8 h-1/15 top-0 sticky"
    >
      <NavLink
        className="text-[1.5rem] font-bold font-[papyrus] tracking-[1px]"
        to="/"
      >
        <img
          className="w-[3em] h-[3em]"
          alt="battle of the brands logo"
          src="/botb-logo.png"
        />
      </NavLink>
      <nav className="flex items-center gap-6">
        <NavLink to={"/battle"}>Battle</NavLink>
        <NavLink to="/characters">Characters</NavLink>
        {token ? (
          <>
            <NavLink to="/characters/new">Create Creature</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/teams/new">Team Builder</NavLink>
            {profile && <NavLink to={"/users/" + profile.id}>Account</NavLink>}
            <button
              onClick={() => {
                navigate("/");
                logout();
              }}
            >
              Log out
            </button>
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
