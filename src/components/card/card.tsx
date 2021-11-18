import { FC } from "react";
import { dataItems } from "../../services/dataService";
import "./card.css";

interface CardProps {
  games: dataItems[];
}

const Card: FC<CardProps> = ({ games }): JSX.Element => {
  function renderItem(arr: dataItems[]) {
    const items = arr.map((item: dataItems) => {
      let star = "";
      if (item.rating) {
        for (let i = 0; i < item.rating; i++) {
          star += " star_border";
        }
      }
      return (
        <div className="scene" key={item.id}>
          <div className="card">
            <div className="card-front">
              <div>
                <img className="size_img" src={item.img} />
              </div>
              <div className="card-padding">
                <div className="d_flex">
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </div>
                <div>
                  <i className="material-icons">{star}</i>
                </div>
              </div>
            </div>
            <div className="card-back text">
              {item.description}
              <button className="btn">Add to cart</button>
            </div>
          </div>
        </div>
      );
    });
    return items;
  }
  const items = renderItem(games);
  return <div className="grid_games">{items}</div>;
};

export default Card;
