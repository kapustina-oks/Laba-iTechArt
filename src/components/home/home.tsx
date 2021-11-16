import { useEffect, FC, useState } from "react";
import { dataItems, getResource } from "../../services/dataService";
//import Categories from "../categories/categories";
import Card from "@/components/card/card";
import "./home.css";

const Home: FC = () => {
  const [gameList, setGameList] = useState<dataItems[]>([]);
  const onRequest = () => {
    getResource("/api/games?sortBy=date").then((data) => setGameList(data));
  };
  useEffect(() => {
    onRequest();
  }, [gameList]);

  const content = <Card games = {gameList} />;
  return (
    <>
      <div className="home_container">
        {content}
      </div>;
    </>
    )

};

export default Home;
