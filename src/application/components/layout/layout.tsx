import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Prospectio" description="Your prospection assistant" />
      <div className="flex flex-1">
        <Sidebar className="flex-shrink-0" />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}