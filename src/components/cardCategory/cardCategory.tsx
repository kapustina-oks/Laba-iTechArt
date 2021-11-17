import { FC } from "react";
import "./cardCategory.css";

const CardCategory: FC = (): JSX.Element => (
  <>
    <div className="grid_category">
      <div className="card-category">
        <div className="fab-icons">
          <i className="fab fa-windows" />
        </div>
        <div className="card-title">PC</div>
      </div>
      <div className="card-category">
        <div className="fab-icons">
          <i className="fab fa-playstation" />
        </div>
        <div className="card-title">Playstation 5</div>
      </div>
      <div className="card-category">
        <div className="fab-icons">
          <i className="fab fa-xbox" />
        </div>
        <div className="card-title">Xbox One</div>
      </div>
    </div>
  </>
);

export default CardCategory;
