import { Link, useParams } from "react-router";
import "../styles/profile.css";
import { useState, useEffect } from "react";
import {
  followUser,
  getUser,
  getUserCharacters,
  getUserFollowers,
  getUserFollowing,
  getUserHistory,
  getUserTeams,
} from "../api/users";
import { useAuth } from "../auth/AuthContext";

const defaultAvatar = "https://via.placeholder.com/150";

export default function Profile() {
  const { id } = useParams();
  const { token } = useAuth();

  const [profile, setProfile] = useState();
  useEffect(() => {
    const tryGetProfile = async () => {
      const retrievedProfile = await getUser(id);
      setProfile(retrievedProfile);
    };
    tryGetProfile();
  }, []);

  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const tryGetTeams = async () => {
      const retrievedTeams = await getUserTeams(id);
      setTeams(retrievedTeams);
    };
    tryGetTeams();
  }, []);

  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const tryGetCharacters = async () => {
      const retrievedCharacters = await getUserCharacters(id);
      setCharacters(retrievedCharacters);
    };
    tryGetCharacters();
  }, []);

  const [history, setHistory] = useState();
  useEffect(() => {
    const tryGetHistory = async () => {
      const retrievedHistory = await getUserHistory(id);
      setHistory(retrievedHistory);
    };
    tryGetHistory();
  }, []);

  const [followers, setFollowers] = useState();
  useEffect(() => {
    const tryGetFollowers = async () => {
      const retrievedFollowers = await getUserFollowers(id);
      setFollowers(retrievedFollowers);
    };
    tryGetFollowers();
  }, []);

  const [following, setFollowing] = useState();
  useEffect(() => {
    const tryGetFollowing = async () => {
      const retrievedFollowing = await getUserFollowing(id);
      setFollowing(retrievedFollowing);
    };
    tryGetFollowing();
  }, []);

  const [isFollowing, setIsFollowing] = useState(false);

  if (!profile || !teams || !characters || !history || !followers || !following)
    return <p>Loading profile</p>;

  const tryFollow = async () => {
    await followUser(id, token);
    setIsFollowing(true);
  };

  const tryUnfollow = async () => {
    setIsFollowing(false);
  };

  return (
    <section className="profile">
      <div className="profile-header">
        <img src={defaultAvatar} alt="Profile" className="profile-avatar" />
        <h1>{profile.username}'s Profile</h1>
        {token && isFollowing ? (
          <button onClick={tryUnfollow}>Unfollow</button>
        ) : (
          <button onClick={tryFollow}>Follow</button>
        )}
      </div>

      <div className="profile-section">
        <h2>Social</h2>
        <div className="stats">
          <div className="stat-card">
            <span className="stat-number">{followers.length}</span>
            <span className="stat-label">
              <Link to="followers">Followers</Link>
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{following.length}</span>
            <span className="stat-label">
              <Link to="following">Following</Link>
            </span>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h2>Battle History</h2>
        <div className="stats">
          <div className="stat-card">
            <span className="stat-number">{history.wins}</span>
            <span className="stat-label">Wins</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{history.total_battles}</span>
            <span className="stat-label">Battles</span>
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
