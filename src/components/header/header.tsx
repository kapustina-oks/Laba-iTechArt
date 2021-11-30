import React, { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { links } from "@/links";
import { AuthContext } from "@/components/context/context";
import Modal from "../modal/modal";
import Dropdown from "../dropdown/dropdown";

const { home, product, about } = links;

const Header: FC = (): JSX.Element => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [isOpenModalSignIn, setIsOpenModalSignIn] = useState<boolean>(false);
  const [isOpenModalSignUp, setIsOpenModalSignUp] = useState<boolean>(false);

  const { auth, modal, userName, authLogOut, onCloseModal } = useContext(AuthContext);

  useEffect(() => {
    if (modal) {
      setIsOpenModalSignUp(true);
      onCloseModal();
    }
  }, [modal]);

  const openModal = (event: React.SyntheticEvent<HTMLElement>) => {
    if (event.currentTarget.dataset.sign === "signIn") {
      setIsOpenModalSignIn(true);
    }
    if (event.currentTarget.dataset.sign === "signUp") {
      setIsOpenModalSignUp(true);
    }
  };

  const closeModal = (): void => {
    setIsOpenModalSignIn(false);
    setIsOpenModalSignUp(false);
  };

  let className = "nav-elem arrow";
  if (dropdown) {
    className = "nav-elem arrow-top";
  }

  return (
    <header>
      {auth ? (
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
                <Link className="nav-link" to="/profile">
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
      ) : (
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
              <li className="nav-elem" data-sign="signIn" onClick={openModal}>
                <div className="nav-link">Sign in</div>
              </li>
              {isOpenModalSignIn && <Modal title="Authorization" onSubmit={closeModal} />}
              <li className="nav-elem " data-sign="signUp" onClick={openModal}>
                <div className="nav-link">Sign up</div>
              </li>
              {isOpenModalSignUp && <Modal title="Registration" onSubmit={closeModal} />}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
