import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import { getUserFollowing } from "../../api/users";
import { useAuth } from "../../auth/AuthContext";

const defaultAvatar = "https://via.placeholder.com/150";

export default function FollowingList() {
  const { id } = useParams();
  const { profile } = useAuth();

  const [following, setFollowing] = useState();
  useEffect(() => {
    const tryGetFollowing = async () => {
      const retrievedFollowing = await getUserFollowing(id);
      setFollowing(retrievedFollowing);
    };
    tryGetFollowing();
  }, []);

  if (!profile || !following) return <p>Loading following</p>;

  return (
    <section className="profile">
      <div className="profile-header">
        <img src={defaultAvatar} alt="Profile" className="profile-avatar" />
        <h1>{profile.username}'s Following</h1>
      </div>

      <div className="profile-section">
        <ul>
          {following.map((user) => (
            <li key={user.id}>
              <Link to={"/users/" + user.id}>{user.username}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
