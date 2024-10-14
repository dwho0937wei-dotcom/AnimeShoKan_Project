import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul className="NavList">
      <li>
        <NavLink to="/" style={{ 'textDecoration': 'none', 'color': '#CBC3E3' }}><FaHome className="FaHome"/></NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
