import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router";

const defaultAvatar = "https://via.placeholder.com/150";

export default function Profile() {
  // Dummy data
  const username = "Player1";
  const wins = 12;
  const losses = 7;
  const teams = [
    { id: 1, name: "Alpha Squad" },
    { id: 2, name: "Beta Force" },
  ];
  const characters = [
    { id: 1, name: "Hero" },
    { id: 2, name: "Mage" },
  ];

  return (
    <section className="max-w-150 m-[40px_auto] bg-neutral-600 rounded-2xl p-8">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={defaultAvatar}
          alt="Profile"
          className="w-25 h-25 border-[3px] border-red-600 rounded-[50%] object-cover"
        />
        <h1>{username}'s Profile</h1>
      </div>

      <div className="mb-8">
        <h2>Battle History</h2>
        <div className="flex gap-6 mt-4">
          <div className="bg-[#f5f7fa] rounded-lg py-4 px-6 text-center w-[clamp(100px,150px,200px)]">
            <span className="text-[2rem] font-bold text-red-600">{wins}</span>
            <span className="block mt-2 text-[#555] text-[2rem]">Wins</span>
          </div>
          <div className="bg-[#f5f7fa] rounded-lg py-4 px-6 text-center w-[clamp(100px,150px,200px)]">
            <span className="text-[2rem] font-bold text-red-600">{losses}</span>
            <span className="block mt-2 text-[#555] text-[2rem]">Losses</span>
          </div>
        </div>
      </div>

      <Link to="/team-builder" className="mb-4 block font-bold text-red-600">
        Go to Team Builder
      </Link>

      <div className="mb-8">
        <h2>My Teams</h2>
        <ul>
          {teams.map((team) => (
            <li className="mb-2" key={team.id}>
              <Link className="text-red-600 hover:underline" to="/teams">
                {team.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2>My Characters</h2>
        <ul>
          {characters.map((char) => (
            <li className="mb-2" key={char.id}>
              <Link className="text-red-600 hover:underline" to="/characters">
                {char.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
