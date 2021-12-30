import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SearchPanel from "./searchPanel";

const onRequestFilter = jest.fn().mockImplementation((filter) => filter);
const setLoading = jest.fn();
const onRequestSort = jest.fn().mockImplementation((sort) => sort);
const onChange = jest.fn().mockImplementation((e) => e.target.value);

describe("Tests of SearchPanel", () => {
  it("renders contain some text", () => {
    render(<SearchPanel onRequestFilter={onRequestFilter} onLoading={setLoading} reset={onRequestSort} />);
  });

  it("SearchPanel snapshot", () => {
    render(<SearchPanel onRequestFilter={onRequestFilter} onLoading={setLoading} reset={onRequestSort}/>);
    expect(document.body).toMatchSnapshot();
  });

  it("SearchPanel render without reset", () => {
    render(<SearchPanel onRequestFilter={onRequestFilter} onLoading={setLoading}/>);
    expect(screen.getByPlaceholderText("Search game...")).toBeInTheDocument();
  });

  it("SearchPanel render without loading", () => {
    render(<SearchPanel onRequestFilter={onRequestFilter} reset={onRequestSort}/>);
    expect(screen.getByPlaceholderText("Search game...")).toBeInTheDocument();
  });

  it("SearchPanel render without props", () => {
    render(<SearchPanel/>);
    expect(screen.getByPlaceholderText("Search game...")).toBeInTheDocument();
  });

  it("onChangeHandler works", () => {
    render(<SearchPanel onRequestFilter={onRequestFilter} onLoading={setLoading} reset={onRequestSort} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "test" } });
    //expect(onChange).toHaveBeenCalled(4);
  });

});
