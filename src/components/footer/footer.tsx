import "./footer.css";
import { FC } from "react";

const Footer: FC = (): JSX.Element => (
  <footer>
    <div className="wrapper">
      <div className="slogan">Incredible convenient</div>
      <div className="icons">
        <ul className="icons-list">
          <li className="icons-elem">
            <a href="https://www.playstation.com/en-us/">Sony</a>
          </li>
          <li className="icons-elem">
            <a href="https://www.tencent.com/en-us">Tencent</a>
          </li>
          <li className="icons-elem">
            <a href="https://www.nintendo.com/">Nintendo</a>
          </li>
          <li className="icons-elem">
            <a href="https://www.nintendo.com/">Activision Blizzard</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
