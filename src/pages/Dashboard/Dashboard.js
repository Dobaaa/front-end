import { Outlet } from "react-router-dom";
import SideBar from "../../components/Dashboard/SideBar";
import TopBar from "../../components/Dashboard/TopBar";
import "./Dashboard.css";
export default function Dashboard() {
  return (
    <div className="position-relative Dashboard  ">
      <TopBar />
      <div className="users-parent d-flex gap-2">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}
