import { Outlet } from "react-router";

import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="h-14/15 mt-0 overflow-scroll">
        <Outlet />
      </main>
    </>
  );
}
