import { useEffect, FC, useState } from "react";
import { dataItems, getAllGames } from "../../services/dataService";
import "./home.css";

const Home: FC = () => {
  const [gameList, setGameList] = useState<dataItems>([]);
  const onRequest = () => {
    getAllGames()
      .then((game) => console.log(game))
      .then((data) => setGameList(data));
  };
  useEffect(() => {
    onRequest();
  }, []);
  function renderItem(arr) {
    const items = arr.map((item: dataItems) => {
      return (
        <div className="card" key={item.id}>
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={item.img} />
          </div>
          <div className="card-content" />
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
            <p>Here is some more information about this product that is only revealed once clicked on.</p>
          </div>
        </div>
      );
    });
    return <div className="grid_games">{items}</div>;
  }
  const content = renderItem(gameList);
  return <div>{content}</div>;
};

export default Home;
