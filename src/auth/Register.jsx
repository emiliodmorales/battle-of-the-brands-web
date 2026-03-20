import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../styles/auth.css";

import { useAuth } from "./AuthContext";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      //await register({ username, password });
      navigate("/profile");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-form">
          <h1>Register for an account</h1>
          <form action={onRegister}>
            <label>
              Username
              <input type="text" name="username" />
            </label>
            <label>
              Password
              <input type="password" name="password" required />
            </label>
            <button>Register</button>
            {error && <output className="error">{error}</output>}
          </form>
          <Link to="/login" className="auth-link">
            Already have an account? Log in here.
          </Link>
        </div>
      </div>
    </>
  );
}
