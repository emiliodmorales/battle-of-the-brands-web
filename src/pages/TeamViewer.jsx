import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function TeamViewer() {
  const { token, getProfile } = useAuth();
  const [team, setTeam] = useState();

  useEffect(() => {}, []);

  return <></>;
}
