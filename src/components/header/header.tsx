import { Link } from "react-router-dom";
import "./header.css";
import { links } from "@/links";
import { FC, useState } from "react";
import Dropdown from "../dropdown/dropdown";

const { home, product, about, signin, signup } = links;

const Header: FC = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  const onMouseEnter = () => setDropdown(true);
  const onMouseLeave = () => setDropdown(false);

  let className = "nav-elem arrow";
  if (dropdown) {
    className = "nav-elem arrow-top";
  }
  return (
    <header>
      <div className="container">
        <div className="logo">Game Store</div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-elem">
              <Link className="nav-link" to={home}>
                Home
              </Link>
            </li>
            <li className={className} onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
              <Link className="nav-link" to={product}>
                Products
              </Link>
              {dropdown && <Dropdown />}
            </li>
            <li className="nav-elem">
              <Link className="nav-link" to={about}>
                About
              </Link>
            </li>
            <li className="nav-elem">
              <Link className="nav-link" to={signin}>
                Sign in
              </Link>
            </li>
            <li className="nav-elem">
              <Link className="nav-link" to={signup}>
                Sign up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
