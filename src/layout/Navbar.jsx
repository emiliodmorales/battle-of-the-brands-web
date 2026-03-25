import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { token, logout, getProfile } = useAuth();

  const [profile, setProfile] = useState();
  useEffect(() => {
    const tryGetProfile = async () => {
      const retrievedProfile = await getProfile();
      setProfile(retrievedProfile);
    };
    tryGetProfile();
  }, []);

  if (token && !profile) return <></>;

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
            <NavLink to="/characters/new">Create Creature</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to={"/users/" + profile.id}>Account</NavLink>
            <NavLink to="/team-builder">Team Builder</NavLink>
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
