import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";

const homeLink =
  "hover p-25 font-[Papyrus] text-xl font-semibold bg-[#333] rounded-lg";

// Create Homepage(edits will be made)
export default function Home() {
  const { token } = useAuth();
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="pb-5 font-[Papyrus] text-6xl uppercase">
        Battle of the Brands!
      </h1>
      <p className=" pb-3 font-[Papyrus] text-3xl ">
        Create your heroes, Forge your team, Battle your friends!
      </p>
      <div className="flex gap-6">
        {token ? (
          <>
            <Link to="/characters" className={homeLink}>
              Characters
            </Link>
            <Link to="/teams" className={homeLink}>
              Teams
            </Link>
            <Link to="/battle" className={homeLink}>
              Battle
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className={homeLink}>
              Login
            </Link>
            <Link to="/register" className={homeLink}>
              Register
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
