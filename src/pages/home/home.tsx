import { useEffect, FC, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Card from "@/components/card/card";
import { ICategories, dataItems } from "@/types/types";
import { getResource } from "@/services/dataService";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { authLogInAction } from "@/store/actionCreators/authActions";
import { openModalAction } from "@/store/actionCreators/modalActions";
import { userNameAction } from "@/store/actionCreators/userNameAction";
import { RootState } from "@/store/reducers/rootReducer";
import CardCategory from "../../components/cardCategory/cardCategory";
import Spinner from "../../components/spinner/spinner";
import SearchPanel from "../../components/searchPanel/searchPanel";

const Home: FC = (): JSX.Element => {
  const [gameList, setGameList] = useState<dataItems[]>([]);
  const [categoriesList, setCategoriesList] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.auth);

  useEffect(() => {
    if (location.pathname === "/:login" && !auth) {
      dispatch(openModalAction());
    }
  }, [auth]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(authLogInAction());
      dispatch(userNameAction(user));
    }
  }, []);

  const onRequestSort = () => {
    getResource("/api/games?sortBy=date&limit=3").then((data) => setGameList(data));
  };

  const onRequestCategories = () => {
    getResource("/api/categories").then((data) => setCategoriesList(data));
  };

  useEffect(() => {
    onRequestSort();
    onRequestCategories();
  }, []);

  const onRequestFilter = (response: dataItems[]): void => {
    setGameList(response);
  };

  const handleCategory = (category: string): void => {
    router.push(`/products/${category}`);
  };
  return (
    <>
      <div className="home_container">
        <SearchPanel
          onRequestFilter={onRequestFilter}
          onLoading={(load) => setLoading(load)}
          reset={onRequestSort}
        />
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
