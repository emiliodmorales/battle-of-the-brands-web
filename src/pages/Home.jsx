import { Link } from "react-router";

// Create Homepage(edits will be made)
export default function Home() {
  return (
    <section className="home">
      <h1>Battle of the Brands!</h1>
      <p className="motto">
        Create your heroes, Forge your team, Battle your friends!
      </p>
      <div className="home-links">
        <Link to="/login" className="home-link">
          Login
        </Link>
        <Link to="/register" className="home-link">
          Register
        </Link>
      </div>
    </section>
  );
}
