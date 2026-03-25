import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import { getUser, getUserFollowers } from "../../api/users";
import { useAuth } from "../../auth/AuthContext";

const defaultAvatar = "https://via.placeholder.com/150";

export default function FollowerList() {
  const { id } = useParams();
  const { profile } = useAuth();

  const [followers, setFollowers] = useState();
  useEffect(() => {
    const tryGetFollowers = async () => {
      const retrievedFollowers = await getUserFollowers(id);
      setFollowers(retrievedFollowers);
    };
    tryGetFollowers();
  }, []);

  if (!profile || !followers) return <p>Loading followers</p>;

  return (
    <section className="profile">
      <div className="profile-header">
        <img src={defaultAvatar} alt="Profile" className="profile-avatar" />
        <h1>{profile.username}'s Followers</h1>
      </div>

      <div className="profile-section">
        <ul>
          {followers.map((user) => (
            <li key={user.id}>
              <Link to={"/users/" + user.id}>{user.username}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
