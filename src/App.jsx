import { Route, Routes } from "react-router";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Layout from "./layout/Layout";
import Battle from "./pages/Battle";
import CharacterBrowser from "./pages/Characters/CharacterBrowser";
import CharacterCreator from "./pages/Characters/CharacterCreator";
import CharacterDetails from "./pages/Characters/CharacterDetails";
import CharacterEditor from "./pages/Characters/CharacterEditor";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import FollowerList from "./pages/Social/FollowerList";
import FollowingList from "./pages/Social/FollowingList";
import Profile from "./pages/Social/Profile";
import TeamBrowser from "./pages/Teams/TeamBrowser";
import TeamBuilder from "./pages/Teams/TeamBuilder";
import TeamViewer from "./pages/Teams/TeamViewer";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users">
          <Route index element={<Error404 />} />
          <Route path=":id" element={<Profile />} />
          <Route path=":id/followers" element={<FollowerList />} />
          <Route path=":id/following" element={<FollowingList />} />
        </Route>
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
          <Route path="new" element={<TeamBuilder />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
