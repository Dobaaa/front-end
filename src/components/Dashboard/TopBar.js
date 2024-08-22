import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Bars.css";
import { useContext } from "react";
import { Menu } from "../../context/Menucontext";

export default function TopBar() {
  const menu = useContext(Menu);
  const SetOpen = menu.SetOpen;
  return (
    <div className="Top d-flex align-items-center justify-content-between">
      <div className="d-flex  align-items-center gap-5">
        <h2>Dashboard</h2>
        <FontAwesomeIcon
          onClick={() => SetOpen((prev) => !prev)}
          cursor={"pointer"}
          icon={faBars}
        />
      </div>
    </div>
  );
}
