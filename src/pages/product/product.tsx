import { FC, useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import { getFilter, getResource } from "@/services/dataService";
import Card from "@/components/card/card";
import { dataItems, IFilterState } from "@/types/types";
import "./product.css";
import Spinner from "@/components/spinner/spinner";
import SearchPanel from "../../components/searchPanel/searchPanel";
import Filter from "../../components/filter/filter";
import transformParam from "../../utils/transformParam";

// const Card = React.lazy(() => import("@/components/card/card"));
// const SearchPanel = React.lazy(() => import("../../components/searchPanel/searchPanel"));

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

  const filterStr = localStorage.getItem("filter");

  const onRequestFilter = (response: dataItems[]): void => {
    setProductList(response);
  };

  const onRequest = (category: string) => {
    getResource(`/api/games?category=${category}&${filterStr}`).then((data) => setProductList(data));
  };

  const onFilter = (filter: IFilterState) => {
    getFilter(`/api/games?${transformParam(filter as IObjectKeys)}`).then((data) => setProductList(data));
  };

  const getProduct = () => {
    getResource(`/api/games?${filterStr}&category=${categories}`).then((data) => setProductList(data));
  };

  useEffect(() => {
    getResource("/api/games?").then((data) => setProductList(data));
  }, []);

  useEffect(() => {
    if (categories) {
      onRequest(categories);
      localStorage.setItem("category", categories);
    }
  }, [categories, filterStr]);

  const contentProduct = productList.map((game) => <Card game={game} key={game.id} />);

  return (
    <Suspense fallback={<Spinner />}>
      <div className="home_container">
        <div className="grid_product">
          <div className="search-grid">
            <SearchPanel onRequestFilter={onRequestFilter} onLoading={(load) => setLoading(load)} reset={getProduct} />
          </div>
          <div className="sidebar">
            <Filter onFilter={onFilter} />
          </div>
          {loading ? <Spinner /> : contentProduct}
        </div>
      </div>
    </Suspense>
  );
};

export default Products;
