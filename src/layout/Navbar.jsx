import { NavLink } from "react-router";
import "../styles/navbar.css";
import { useAuth } from "../auth/AuthContext";

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
            <NavLink to="/characters/new">Create Creature</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to={"/users/" + profile.id}>Account</NavLink>
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
