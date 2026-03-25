import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

const labelStyle =
  "flex flex-col text-left font-semibold text-[0.9rem] mb-4 text-[#333]";
const inputStyle =
  "mt-[0.3rem] p-[0.7rem] border border-[#ccc] rounded-md font-[1rem]";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const { token, login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await login({ username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, []);

  return (
    <>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="bg-[#f9f9f9] p-10 rounded-xl container max-w-100 text-center font-[papyrus] shadow-[0_4px_12px_#0000001A]">
          <h1 className="mb-6 text-[1.8rem] text-[#333]">
            Log in to your account
          </h1>
          <form action={onLogin}>
            <label className={labelStyle}>
              Username
              <input
                className={inputStyle}
                type="username"
                name="username"
                required
              />
            </label>
            <label className={labelStyle}>
              Password
              <input
                className={inputStyle}
                type="password"
                name="password"
                required
              />
            </label>
            <button className="container p-3 mt-2 text-[1.1rem] font-semibold text-[#ff0000] bg-black rounded-md cursor-pointer font-[Papyrus] hover">
              Login
            </button>
            {error && (
              <output className="mt-3 text-[0.9rem] text-[#ff0000]">
                {error}
              </output>
            )}
          </form>
          <Link to="/register" className="block mt-5 text-[#444] text-[0.9rem]">
            Need an account? Register here.
          </Link>
        </div>
      </div>
    </>
  );
}
