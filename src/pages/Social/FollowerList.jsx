import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import { getUser, getUserFollowers } from "../../api/users";

export default function FollowerList() {
  const { id } = useParams();

  const [aboutProfile, setAboutProfile] = useState();
  useEffect(() => {
    const tryGetAboutProfile = async () => {
      const retrievedAboutProfile = await getUser(id);
      setAboutProfile(retrievedAboutProfile);
    };
    tryGetAboutProfile();
  }, []);

  const [followers, setFollowers] = useState();
  useEffect(() => {
    const tryGetFollowers = async () => {
      const retrievedFollowers = await getUserFollowers(id);
      setFollowers(retrievedFollowers);
    };
    tryGetFollowers();
  }, []);

  if (!aboutProfile || !followers) return <p>Loading followers</p>;

  return (
    <section className="max-w-150 m-[40px_auto] bg-neutral-600 rounded-2xl p-8">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={aboutProfile.image}
          alt="Profile"
          className="w-25 h-25 border-[3px] border-red-600 rounded-[50%] object-cover"
        />
        <h1>{aboutProfile.username}'s Followers</h1>
      </div>

      <div className="mb-8">
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
