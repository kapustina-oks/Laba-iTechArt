import { Link } from "react-router-dom";
import "./header.css";
import { links } from "@/links";
import { FC, useState } from "react";
import Dropdown from "../dropdown/dropdown";
import Modal from "../modal/modal";

const { home, product, about } = links;

const Header: FC = (): JSX.Element => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen(() => !isOpen);
  };

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
            <li className="nav-elem" onClick={toggleModal}>
              {isOpen && (
                <Modal title="Authorization" onSubmit={toggleModal}>
                  <div className="form">
                    <div className="form-group">
                      <label htmlFor="login">Login</label>
                      <input className="input-form" type="text" name="login" placeholder="login" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input className="input-form" type="text" name="password" placeholder="password" />
                    </div>
                  </div>
                </Modal>
              )}
              <Link className="nav-link" to="/">
                Sign in
              </Link>
            </li>
            <li className="nav-elem" onClick={toggleModal}>
              {isOpen && (
                <Modal title="Registration" onSubmit={toggleModal}>
                  <div className="form">
                    <div className="form-group">
                      <label htmlFor="login">Login</label>
                      <input className="input-form" type="text" name="login" placeholder="login" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input className="input-form" type="text" name="password" placeholder="password" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input className="input-form" type="text" name="password" placeholder="password" />
                    </div>
                  </div>
                </Modal>
              )}
              <Link className="nav-link" to="/">
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
