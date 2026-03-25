import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

const labelStyle =
  "flex flex-col text-left font-semibold text-[0.9rem] mb-4 text-[#333]";
const inputStyle =
  "mt-[0.3rem] p-[0.7rem] border border-[#ccc] rounded-md font-[1rem]";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register, getProfile } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ username, password });
      const profile = await getProfile();
      navigate("/users/" + profile.id);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="bg-[#f9f9f9] p-10 rounded-xl container max-w-100 text-center font-[papyrus] shadow-[0_4px_12px_#0000001A]">
          <h1 className="mb-6 text-[1.8rem] text-[#333]">
            Register for an account
          </h1>
          <form action={onRegister}>
            <label className={labelStyle}>
              Username
              <input
                className={inputStyle}
                type="text"
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
              Register
            </button>
            {error && (
              <output className="mt-3 text-[0.9rem] text-[#ff0000]">
                {error}
              </output>
            )}
          </form>
          <Link to="/login" className="block mt-5 text-[#444] text-[0.9rem]">
            Already have an account? Log in here.
          </Link>
        </div>
      </div>
    </>
  );
}
