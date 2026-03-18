import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { token } = useAuth();

  return (
    <section>
      <h1>My Profile</h1>
    </section>
  );
}
