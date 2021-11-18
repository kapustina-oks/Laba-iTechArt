import { useEffect, FC, useState } from "react";
import Card from "@/components/card/card";
import { dataItems, getResource } from "../../services/dataService";
import CardCategory from "../cardCategory/cardCategory";
import "./home.css";
import SearchPanel from "../searchPanel/searchPanel";
import { useHistory } from "react-router-dom";
import Spinner from "../spinner/spinner";

const Home: FC = (): JSX.Element => {
  const [gameList, setGameList] = useState<dataItems[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useHistory();
  const onRequestFilter = (response: dataItems[]): void => {
    setGameList(response);
  };

  const onLoading = (load: boolean): void => {
    setLoading(load);
  };

  const onRequestSort = () => {
    getResource("/api/games?sortBy=date&limit=3").then((data) => setGameList(data));
  };

  useEffect(() => {
    onRequestSort();
  }, []);

  const handleCategory = (category: string): void => {
    router.push(`/products/${category}`);
  };

  const content = <Card games={gameList} />;
  return (
    <>
      <div className="home_container">
        <SearchPanel onRequestFilter={onRequestFilter} onLoading={onLoading} />
        <div className="new-games">Categories</div>
        <CardCategory handleCategory={handleCategory} />
        <div className="new-games">New games</div>
        {loading ? <Spinner /> : content}
      </div>
    </>
  );
};

export default Home;
