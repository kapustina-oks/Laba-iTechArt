import { useEffect, FC, useState } from "react";
import { dataItems } from "../../services/dataService";
import "./card.css";

interface CardProps {
  games: dataItems[];
}

const Card: FC = ({ games }: CardProps) => {
  // const [arrGames, setArrGames] = useState<dataItems[]>([]);
  // const arrGamesLoaded = (gamesArr): void => {
  //   setArrGames(gamesArr);
  // };
  // useEffect(() => {
  //   arrGamesLoaded(games);
  // }, [arrGames]);
  function renderItem(arr: dataItems[]) {
    const items = arr.map((item: dataItems) => {
      let star = "";
      if (item.rating) {
        for (let i = 0; i < item.rating; i++) {
          star += " star_border";
        }
      }
      return (
        <div className="card" key={item.id}>
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator size_img" src={item.img} />
          </div>
          <div className="card-content card-padding">
            <div className="card-reveal d_flex">
              <span className="card-title grey-text text-darken-4">{item.name}</span>
              <span>{item.price}</span>
            </div>
            <div><i className="material-icons">{star}</i></div>
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
