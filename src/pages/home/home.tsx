import { useEffect, FC, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "@/components/card/card";
import { ICategories, dataItems } from "@/types/types";
import { getResource } from "@/services/dataService";
import CardCategory from "../../components/cardCategory/cardCategory";
import "./home.css";
import SearchPanel from "../../components/searchPanel/searchPanel";
import Spinner from "../../components/spinner/spinner";

const Home: FC = (): JSX.Element => {
  const [gameList, setGameList] = useState<dataItems[]>([]);
  const [categoriesList, setCategoriesList] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useHistory();

  const onRequestSort = () => {
    getResource("/api/games?sortBy=date&limit=3").then((data) => setGameList(data));
  };

  const onRequestCategories = () => {
    getResource("/api/categories").then((data) => setCategoriesList(data));
  };

  const onRequestFilter = (response: dataItems[]): void => {
    setGameList(response);
  };

  useEffect(() => {
    if (!loading) {
      onRequestSort();
    }
    onRequestCategories();
  }, [loading]);

  const handleCategory = (category: string): void => {
    router.push(`/products/${category}`);
  };
  return (
    <>
      <div className="home_container">
        <SearchPanel onRequestFilter={onRequestFilter} onLoading={(load) => setLoading(load)} />
        <div className="new-games">Categories</div>
        <div className="grid_category">
          {categoriesList.map((category: ICategories) => (
            <CardCategory category={category} key={category.id} handleCategory={handleCategory} />
          ))}
        </div>
        <div className="new-games">New games</div>
        <div className="grid_games">
          {loading ? <Spinner /> : gameList.map((game) => <Card game={game} key={game.id} />)}
        </div>
      </div>
    </>
  );
};

export default Home;
