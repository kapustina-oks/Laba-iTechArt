import FormCreateAndEditCard from "./formCreateAndEditCard";
import { fireEvent, render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { describe } from "jest";
import rootReducer from "../../../store/reducers/rootReducer";

export const { expect } = window;

describe("FormCreateAndEditCard tests", () => {
  const store = configureStore({ reducer: rootReducer });

  it("render FormCreateAndEditCard without props", () => {
    render(
      <Provider store={store}>
        <FormCreateAndEditCard />
      </Provider>
    );
  });

  it("snapshot FormCreateAndEditCard", () => {
    render(
      <Provider store={store}>
        <FormCreateAndEditCard />
      </Provider>
    );
    expect(document.body).toMatchSnapshot();
  });

  it("render checkbox", () => {
    const handleHasCategoryChange = jest.fn();
    const { container } = render(
      <input type="checkbox" className="checkbox" id="playstation" onChange={handleHasCategoryChange("hasXbox")} />
    );
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(handleHasCategoryChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });
});
