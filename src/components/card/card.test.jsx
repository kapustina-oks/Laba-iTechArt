import Card from "./card";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../../store/reducers/rootReducer";

import dataGames from "../../mock/dataBase";

describe("Card", () => {
  const store = configureStore({ reducer: rootReducer });

  it("renders without crashing", () => {
    render(<Provider store={store}><Card game={dataGames[0]}/></Provider>);
    expect(screen.getByText("Game of Thrones")).toBeInTheDocument();
  });

  it("card snapshot", () => {
    render(<Provider store={store}><Card game={dataGames[0]} /></Provider>);
    expect(document.body).toMatchSnapshot();
  });

  it("", () => {
    render(<Provider store={store}><Card game={dataGames[0]} /></Provider>);
    expect(screen.queryByText("hbhh")).toBeNull();
  });
});
