import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar className="flex-shrink-0" />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}