import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CharacterBrowser from "./pages/CharacterBrowser";
import CharacterDetails from "./pages/CharacterDetails";
import CharacterEditor from "./pages/CharacterEditor";
import CharacterCreator from "./pages/CharacterCreator";
import Battle from "./pages/Battle";
import TeamBrowser from "./pages/TeamBrowser";
import TeamViewer from "./pages/TeamViewer";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/characters">
          <Route index element={<CharacterBrowser />} />
          <Route path=":id" element={<CharacterDetails />} />
          <Route path=":id/edit" element={<CharacterEditor />} />
          <Route path="new" element={<CharacterCreator />} />
        </Route>
        <Route path="/teams">
          <Route index element={<TeamBrowser />} />
          <Route path=":id" element={<TeamViewer />} />
        </Route>
      </Route>
    </Routes>
  );
}
