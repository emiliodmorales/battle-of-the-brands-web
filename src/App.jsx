import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CharacterBrowser from "./pages/CharacterBrowser";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/characters">
          <Route index element={<CharacterBrowser />} />
        </Route>
      </Route>
    </Routes>
  );
}
