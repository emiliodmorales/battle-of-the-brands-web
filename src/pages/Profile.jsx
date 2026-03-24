import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router";
import "../styles/profile.css";

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
    <section className="profile">
      <div className="profile-header">
        <img src={defaultAvatar} alt="Profile" className="profile-avatar" />
        <h1>{username}'s Profile</h1>
      </div>

      <div className="profile-section">
        <h2>Battle History</h2>
        <div className="stats">
          <div className="stat-card">
            <span className="stat-number">{wins}</span>
            <span className="stat-label">Wins</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{losses}</span>
            <span className="stat-label">Losses</span>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h2>My Teams</h2>
        <ul>
          {teams.map((team) => (
            <li key={team.id}>
              <Link to="/teams">{team.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="profile-section">
        <h2>My Characters</h2>
        <ul>
          {characters.map((char) => (
            <li key={char.id}>
              <Link to="/characters">{char.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
