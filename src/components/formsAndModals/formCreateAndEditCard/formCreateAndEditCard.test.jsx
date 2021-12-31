import FormCreateAndEditCard from "./formCreateAndEditCard";
import { fireEvent, render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";

import userEvent from "@testing-library/user-event";
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

  it("checkbox focus", () => {
    const elem = render(<input type="checkbox" className="checkbox" id="playstation" />);
    const input = elem.container.querySelector("#playstation");
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });

  it("select options test", () => {
    const { selectOptions, getByRole, getByText } = render(
      <select className="select-product" name="select">
        <option value="6+">6+</option>
        <option value="12+">12+</option>
        <option value="18+">18+</option>
      </select>
    );

    userEvent.selectOptions(getByRole("combobox"), "6+");
    expect(getByText("6+").selected).toBeTruthy();

    userEvent.selectOptions(getByRole("combobox"), "12+");
    expect(getByText("12+").selected).toBeTruthy();
    expect(getByText("6+").selected).toBeFalsy();
  });
});
