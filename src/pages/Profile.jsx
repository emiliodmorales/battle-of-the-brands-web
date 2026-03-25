import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import {
  followUser,
  getUser,
  getUserCharacters,
  getUserFollowers,
  getUserFollowing,
  getUserHistory,
  getUserIsFollowing,
  getUserTeams,
  unfollowUser,
} from "../api/users";
import { useAuth } from "../auth/AuthContext";

const defaultAvatar = "https://via.placeholder.com/150";

export default function Profile() {
  const { id } = useParams();
  const { token, getProfile } = useAuth();

  const [profile, setProfile] = useState();
  useEffect(() => {
    const tryGetProfile = async () => {
      const retrievedProfile = await getUser(id);
      setProfile(retrievedProfile);
    };
    tryGetProfile();
  }, []);

  const [isSelf, setIsSelf] = useState();
  useEffect(() => {
    const tryGetIsSelf = async () => {
      if (!profile) return;
      const selfProfile = await getProfile();
      setIsSelf(profile.id === selfProfile.id);
    };
    tryGetIsSelf();
  }, [profile]);

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

  const tryGetFollowers = async () => {
    const retrievedFollowers = await getUserFollowers(id);
    setFollowers(retrievedFollowers);
  };
  const [followers, setFollowers] = useState();
  useEffect(() => {
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

  const [isFollowing, setIsFollowing] = useState();
  useEffect(() => {
    const tryGetIsFollowing = async () => {
      const retrievedIsFollowing = await getUserIsFollowing(id, token);
      setIsFollowing(retrievedIsFollowing);
    };
    tryGetIsFollowing();
  }, []);

  if (!profile || !teams || !characters || !history || !followers || !following)
    return <p>Loading profile</p>;

  const tryFollow = async () => {
    await followUser(id, token);
    setIsFollowing(true);
    tryGetFollowers();
  };

  const tryUnfollow = async () => {
    await unfollowUser(id, token);
    setIsFollowing(false);
    tryGetFollowers();
  };

  return (
    <section className="max-w-150 m-[40px_auto] bg-neutral-600 rounded-2xl p-8">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={defaultAvatar}
          alt="Profile"
          className="w-25 h-25 border-[3px] border-red-600 rounded-[50%] object-cover"
        />
        <h1>{profile.username}'s Profile</h1>
        {token &&
          !isSelf &&
          (isFollowing ? (
            <button onClick={tryUnfollow}>Unfollow</button>
          ) : (
            <button onClick={tryFollow}>Follow</button>
          ))}
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

      <div className="mb-8">
        <h2>Battle History</h2>
        <div className="flex gap-6 mt-4">
          <div className="bg-[#f5f7fa] rounded-lg py-4 px-6 text-center w-[clamp(100px,150px,200px)]">
            <span className="text-[2rem] font-bold text-red-600">
              {history.wins}
            </span>
            <span className="block mt-2 text-[#555] text-[2rem]">Wins</span>
          </div>
          <div className="bg-[#f5f7fa] rounded-lg py-4 px-6 text-center w-[clamp(100px,150px,200px)]">
            <span className="text-[2rem] font-bold text-red-600">
              {history.total_battles}
            </span>
            <span className="block mt-2 text-[#555] text-[2rem]">Battles</span>
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
