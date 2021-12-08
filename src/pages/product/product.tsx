import React, { FC, useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import { getFilter, getResource } from "@/services/dataService";
// import Card from "@/components/card/card";
import { dataItems, IFilterState } from "@/types/types";
import "./product.css";
import Spinner from "@/components/spinner/spinner";
// import SearchPanel from "../../components/searchPanel/searchPanel";
import Filter from "../../components/filter/filter";

const Card = React.lazy(() => import("@/components/card/card"));
const SearchPanel = React.lazy(() => import("../../components/searchPanel/searchPanel"));

interface IParams {
  categories?: string;
}

export interface IObjectKeys extends IFilterState {
  [key: string]: string | number;
}

const transformParam = (param: IObjectKeys): string => {
  const keys = Object.keys(param);
  let result = "";

  if (keys.length) {
    const filterParam = keys.map((key) => `${key}=${param[key]}`).join("&");
    result = `${filterParam}`;
    console.log(result);
  }

  return result;
};

const Products: FC = (): JSX.Element => {
  const { categories } = useParams<IParams>();
  const [productList, setProductList] = useState<dataItems[]>([]);
  const [gameCategoryList, setGameCategoryList] = useState<dataItems[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onRequestFilter = (response: dataItems[]): void => {
    setProductList(response);
  };

  const onRequest = (category: string) => {
    getResource(`/api/games?category=${category}`).then((data) => setGameCategoryList(data));
  };

  const onFilter = (filter: IFilterState) => {
    getFilter(`/api/games?${transformParam(filter as IObjectKeys)}`).then((data) => setProductList(data));
  };

  useEffect(() => {
    if (categories) {
      onRequest(categories);
    } else {
      getResource("/api/games?").then((data) => setProductList(data));
    }
  }, [categories, loading]);

  const contentCategory = gameCategoryList.map((game) => <Card game={game} key={game.id} />);
  const contentProduct = productList.map((game) => <Card game={game} key={game.id} />);
  const content = categories ? contentCategory : contentProduct;

  return (
    <Suspense fallback={<Spinner />}>
      <div className="home_container">
        <div className="grid_product">
          <div className="search-grid">
            <SearchPanel onRequestFilter={onRequestFilter} onLoading={(load) => setLoading(load)} />
          </div>
          <div className="sidebar">
            <Filter onFilter={onFilter} />
          </div>
          <Suspense fallback={<Spinner />}> {content} </Suspense>
        </div>
      </div>
    </Suspense>
  );
};

export default Products;
