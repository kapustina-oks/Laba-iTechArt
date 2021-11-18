import { FC } from "react";
import "./cardCategory.css";

interface PropsCardCategory {
  handleCategory(category: string): void;
}
const CardCategory: FC<PropsCardCategory> = ({ handleCategory }): JSX.Element => (
  <>
    <div className="grid_category">
      <div className="card-category" onClick={() => handleCategory("pc")}>
        <div className="fab-icons">
          <i className="fab fa-windows" />
        </div>
        <div className="card-title">PC</div>
      </div>
      <div className="card-category" onClick={() => handleCategory("playstation")}>
        <div className="fab-icons">
          <i className="fab fa-playstation" />
        </div>
        <div className="card-title">Playstation 5</div>
      </div>
      <div className="card-category" onClick={() => handleCategory("xbox")}>
        <div className="fab-icons">
          <i className="fab fa-xbox" />
        </div>
        <div className="card-title">Xbox One</div>
      </div>
    </div>
  </>
);

export default CardCategory;
