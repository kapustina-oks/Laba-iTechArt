import { FC, lazy, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getFilter, getResource } from "@/services/dataService";
import { dataItems, IFilterState } from "@/types/types";
import "./product.css";
import Spinner from "@/components/spinner/spinner";
import Modal from "@/components/modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "@/store/actionCreators/adminActions";
import { RootState } from "@/store/reducers/rootReducer";
import { loadCartProductsAction } from "@/store/actionCreators/cartActions";
import { isAdminAction } from "@/store/actionCreators/authActions";
import SearchPanel from "../../components/searchPanel/searchPanel";
import Filter from "../../components/filter/filter";
import transformParam from "../../utils/transformParam";
import useSuspense from "./useSuspense";

const Card = lazy(() => import("../../components/card/card"));

interface IParams {
  categories?: string;
}

export interface IObjectKeys extends IFilterState {
  [key: string]: string | number;
}

const Products: FC = (): JSX.Element => {
  const { categories } = useParams<IParams>();
  const [productList, setProductList] = useState<dataItems[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [createModal, setCreateModal] = useState<boolean>(false);

  const filterStr = localStorage.getItem("filter");

  const onRequestFilter = (response: dataItems[]): void => {
    setProductList(response);
  };
  const dispatch = useDispatch();
  const location = useLocation();

  const newProductsList = useSelector((state: RootState) => state.admin.products);
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  useEffect(() => {
    setProductList(newProductsList);
  }, [newProductsList]);

  useEffect(() => {
    dispatch(loadCartProductsAction(productList));
  }, [productList]);

  const onRequest = (category: string) => {
    if (category) {
      getResource(`/api/games?category=${category}&${filterStr}`).then((data) => setProductList(data));
    } else {
      getResource(`/api/games?${filterStr}`).then((data) => setProductList(data));
    }
  };

  const onFilter = (filter: IFilterState) => {
    getFilter(`/api/games?${transformParam(filter as IObjectKeys)}`).then((data) => setProductList(data));
  };

  const getProduct = () => {
    getResource(`/api/games?${filterStr}&category=${categories}`).then((data) => setProductList(data));
  };

  useEffect(() => {
    getResource("/api/games?").then((data) => {
      setProductList(data);
      dispatch(loadGames(data));
    });
  }, []);

  useEffect(() => {
    const isAdminLS = localStorage.getItem("isAdmin");
    if (isAdminLS) {
      dispatch(isAdminAction(true));
    } else {
      dispatch(isAdminAction(false));
    }
  }, [isAdmin]);

  useEffect(() => {
    if (categories) {
      onRequest(categories);
      localStorage.setItem("category", categories);
    } else {
      localStorage.removeItem("category");
      getResource(`/api/games?${filterStr}`).then((data) => setProductList(data));
    }
  }, [categories, filterStr]);

  const contentProduct = productList.map((game) => <Card url={location.pathname} game={game} key={game.id} />);
  const children = useSuspense(500, loading, setLoading, contentProduct, <Spinner />);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [productList]);

  return (
    <div className="home_container">
      <div className="grid_product">
        <div className="search-grid">
          <SearchPanel onRequestFilter={onRequestFilter} onLoading={(load) => setLoading(load)} reset={getProduct} />
        </div>
        <div className="sidebar">
          <Filter onFilter={onFilter} />
          {isAdmin ? (
            <button className="btn-create-card" onClick={() => setCreateModal(true)}>
              Create card
            </button>
          ) : null}
        </div>
        {children}
        {createModal && <Modal title="Create Card" onSubmit={() => setCreateModal(false)} />}
      </div>
    </div>
  );
};

export default Products;
