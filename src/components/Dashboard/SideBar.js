import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Bars.css";
import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Menu } from "../../context/Menucontext";
import { WindowSize } from "../../context/WindowContext";

export default function SideBar() {
  const windowResize = useContext(WindowSize);
  const WindowWidth = windowResize.isWindow;
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;

  return (
    <>
      <div
        className="position-fixed w-100 h-100 "
        style={{
          display: WindowWidth < 768 && isOpen ? "block" : "none",
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      ></div>
      <div
        className="Side pt-4"
        style={{
          left: WindowWidth < "768" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "30%" : "fit-content",
          position: WindowWidth < 768 ? "fixed" : "sticky",
        }}
      >
        <NavLink
          style={{
            justifyContent: isOpen ? " start" : " center ",
          }}
          to={"users"}
          className="d-flex align-items-center gap-2 side-bar-link"
        >
          <FontAwesomeIcon
            icon={faUsers}
            style={{
              padding: isOpen ? " 10px 8px 10px 15px" : " 10px 16px ",
            }}
          />
          <span style={{ display: isOpen ? "block" : "none" }}>Users</span>
        </NavLink>
        <NavLink
          style={{
            justifyContent: isOpen ? " start" : " center ",
          }}
          to={"/dashboard/user/add"}
          className="d-flex align-items-center gap-2 side-bar-link"
        >
          <FontAwesomeIcon
            icon={faPlus}
            style={{
              padding: isOpen ? " 10px 8px 10px 15px" : " 10px 16px ",
            }}
          />
          <span style={{ display: isOpen ? "block" : "none" }}> Add User</span>
        </NavLink>
      </div>
    </>
  );
}
