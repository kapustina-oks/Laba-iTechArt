import { Link } from "react-router-dom";
import "./userHeader.css";
import { links } from "@/links";
import { FC, useContext, useState } from "react";
import Dropdown from "../dropdown/dropdown";
import { AuthContext } from "@/components/context/context";

const { home, product, about, profile } = links;

const UserHeader: FC = (): JSX.Element => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  const { userName, authLogOut } = useContext(AuthContext);

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
            <li className={className} onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
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
            <li className="nav-elem" data-sign="signUp">
              <Link className="nav-link" to={profile}>
                <div className="icons-flex">
                  <i className="fas fa-user icons-size" />
                  <div className="icons-text">{userName}</div>
                </div>
              </Link>
            </li>
            <li className="nav-elem" data-sign="signIn">
              <Link className="nav-link" to="/">
                <div className="icons-flex">
                  <i className="fas fa-shopping-cart icons-size" />
                  <div className="icons-text">0</div>
                </div>
              </Link>
            </li>
            <li className="nav-elem" data-sign="signUp" onClick={() => authLogOut()}>
              <Link className="nav-link" to="/">
                <i className="fas fa-sign-out-alt icons-size" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default UserHeader;
