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
    <section className="max-w-150 m-[40px_auto] bg-neutral-600 rounded-2xl p-8">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={defaultAvatar}
          alt="Profile"
          className="w-25 h-25 border-[3px] border-red-600 rounded-[50%] object-cover"
        />
        <h1>{profile.username}'s Following</h1>
      </div>

      <div className="mb-8">
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
