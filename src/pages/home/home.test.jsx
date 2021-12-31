import { render } from "@testing-library/react";
import Home from "./home";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../../store/reducers/rootReducer";
import dataGames from "../../mock/dataBase";
import userEvent from "@testing-library/user-event";

export const { expect } = window;

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
  useLocation: jest.fn().mockReturnValue({
    pathname: "/",
    search: "",
    hash: "",
    state: null,
  }),
}));

const store = configureStore({ reducer: rootReducer });

describe("testing of home page", () => {
  it("should render home page", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  it("Home snapshot", () => {
    render(<Home />);
    expect(document.body).toMatchSnapshot();
  });

  it("fetches games from an API", () => {
    const mockJSONPromise = Promise.resolve({
      data: dataGames,
    });
    global.fetch = jest.fn().mockImplementationOnce(() => mockJSONPromise);
    const {getByText, findAllByRole} = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(document.body).toMatchSnapshot();

  });
});
