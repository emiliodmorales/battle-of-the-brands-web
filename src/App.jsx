import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CharacterBrowser from "./pages/CharacterBrowser";
import CharacterDetails from "./pages/CharacterDetails";
import TeamBrowser from "./pages/TeamBrowser";
import Battle from "./pages/Battle";

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
          <Route path=":id" element={<CharacterDetails />} />
        </Route>

        <Route path="/teams">
          <Route index element={<TeamBrowser />} />
        </Route>
        <Route path="/battle" element={<Battle />} />
      </Route>
    </Routes>
  );
}
