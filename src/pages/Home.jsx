import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import "./home.css";

// Create Homepage(edits will be made)
export default function Home() {
  const { token } = useAuth();
  return (
    <section className="home">
      <h1>Battle of the Brands!</h1>
      <p className="motto">
        Create your heroes, Forge your team, Battle your friends!
      </p>
      <div className="home-links">
        {token ? (
          <>
            <Link to="/characters" className="home-link">
              Characters
            </Link>
            <Link to="/teams" className="home-link">
              Teams
            </Link>
            <Link to="/battle" className="home-link">
              Battle
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="home-link">
              Login
            </Link>
            <Link to="/register" className="home-link">
              Register
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
