import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilter, getResource } from "@/services/dataService";
import Card from "@/components/card/card";
import { dataItems } from "@/types/types";
import "./product.css";
import Spinner from "@/components/spinner/spinner";
import SearchPanel from "../../components/searchPanel/searchPanel";
import Filter from "../../components/filter/filter";

// const Filter = React.lazy(() => import("../../components/filter/filter"));

interface IParams {
  categories?: string;
}

const transformParam = (param: { [key: string]: string | number }) => {
  const keys = Object.keys(param);
  let result = "";

  if (keys.length) {
    const filterParam = keys.map((key: string) => `${key}=${param[key]}`).join("&");
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

  const onFilter = (result) => {
    console.log(result);
    getFilter(`/api/games?${transformParam(result)}`).then((data) => setProductList(data));

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

  return (
    <div className="home_container">
      <div className="grid_product">
        <div className="search-grid">
          <SearchPanel onRequestFilter={onRequestFilter} onLoading={(load) => setLoading(load)} />
        </div>
        <div className="sidebar">
          <Filter onFilter={onFilter} />
        </div>
        {categories ? contentCategory : contentProduct}
      </div>
    </div>
  );
};

export default Products;

// <React.Suspense fallback={<Spinner />}>
// </React.Suspense>
