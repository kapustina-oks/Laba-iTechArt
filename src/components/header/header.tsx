import { Link } from "react-router-dom";
import "./header.css";
import { links } from "@/links";
import { FC, useState } from "react";
import Modal from "../modal/modal";

const { home } = links;

const Header: FC = (): JSX.Element => {
  const [isOpenModalSignIn, setIsOpenModalSignIn] = useState<boolean>(false);
  const [isOpenModalSignUp, setIsOpenModalSignUp] = useState<boolean>(false);

  const openModal = (event: { currentTarget: { dataset: { sign: string } } }): void => {
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
            <li className="nav-elem arrow" data-sign="signUp" onClick={openModal}>
              <div className="nav-link">
                Products
              </div>
            </li>
            {isOpenModalSignUp && <Modal title="Registration" onSubmit={closeModal} />}
            <li className="nav-elem" data-sign="signUp" onClick={openModal}>
              <div className="nav-link">
                About
              </div>
            </li>
            {isOpenModalSignUp && <Modal title="Registration" onSubmit={closeModal} />}
            <li className="nav-elem" data-sign="signIn" onClick={openModal}>
              <div className="nav-link">
                Sign in
              </div>
            </li>
            {isOpenModalSignIn && <Modal title="Authorization" onSubmit={closeModal} />}
            <li className="nav-elem " data-sign="signUp" onClick={openModal}>
              <div className="nav-link">
                Sign up
              </div>
            </li>
            {isOpenModalSignUp && <Modal title="Registration" onSubmit={closeModal} />}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
