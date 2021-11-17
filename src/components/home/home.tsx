import { useEffect, FC, useState } from "react";
import { dataItems, getResource } from "../../services/dataService";
import CardCategory from "../cardCategory/cardCategory";
import Card from "@/components/card/card";
import "./home.css";
import SearchPanel from "../searchPanel/searchPanel";

const Home: FC = (): JSX.Element => {
  const [gameList, setGameList] = useState<dataItems[]>([]);
  const onRequestSort = () => {
    getResource("/api/games?sortBy=date&limit=3").then((data) => setGameList(data));
  };
  useEffect(() => {
    onRequestSort();
  }, []);

  const content = <Card games={gameList} />;
  return (
    <>
      <div className="home_container">
        <SearchPanel />
        <div className="new-games">Categories</div>
        <CardCategory />
        <div className="new-games">New games</div>
        {content}
      </div>
    </>
  );
};

export default Home;
