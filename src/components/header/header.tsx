import { Link } from "react-router-dom";
import "./header.css";
import { links } from "@/links";

const { home, product, about, signin, signup } = links;

const Header = () => {
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
            <li className="nav-elem arrow">
              <Link className="nav-link" to={product}>
                Products
              </Link>
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
