import { Link } from "react-router-dom";
import "./header.css";
import { links } from "@/links";
import { FC, useState } from "react";
import Dropdown from "../dropdown/dropdown";
import Modal from "../modal/modal";

const { home, product, about } = links;

const Header: FC = (): JSX.Element => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [isOpenModalSignIn, setIsOpenModalSignIn] = useState<boolean>(false);
  const [isOpenModalSignUp, setIsOpenModalSignUp] = useState<boolean>(false);

  const openModal = (event: { currentTarget: { dataset: { sign: string } } }) => {
    if (event.currentTarget.dataset.sign === "signIn") {
      setIsOpenModalSignIn(true);
    }
    if (event.currentTarget.dataset.sign === "signUp") {
      setIsOpenModalSignUp(true);
    }
  };

  const closeModal = () => {
    setIsOpenModalSignIn(false);
    setIsOpenModalSignUp(false);
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
            <li className="nav-elem" data-sign="signIn" onClick={openModal}>
              <Link className="nav-link" to="/">
                Sign in
              </Link>
            </li>
            {isOpenModalSignIn && <Modal title="Authorization" onSubmit={closeModal} />}
            <li className="nav-elem" data-sign="signUp" onClick={openModal}>
              <Link className="nav-link" to="/">
                Sign up
              </Link>
            </li>
            {isOpenModalSignUp && <Modal title="Registration" onSubmit={closeModal} />}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
