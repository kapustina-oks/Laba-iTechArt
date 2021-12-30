import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartItem from "./cartItem";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../../store/reducers/rootReducer";

import dataGames from "../../mock/dataBase";

describe("CardCategory", () => {
  const store = configureStore({ reducer: rootReducer });

  it("testing of cart item", () => {
    render(<Provider store={store}><CartItem game={dataGames[0]}/></Provider>);
  });

  it("renders contain some text", () => {
    render(<Provider store={store}><CartItem game={dataGames[0]} /></Provider>);
    expect(screen.getByText("Game of Thrones")).toBeInTheDocument();
  });

  it("CartItem snapshot", () => {
    const card = render(<Provider store={store}><CartItem game={dataGames[0]} /></Provider>);
    expect(document.body).toMatchSnapshot();
  });
});
