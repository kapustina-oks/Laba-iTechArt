import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { categories } from "../../mock/categories";
import CardCategory from "./cardCategory";

describe("CardCategory", () => {
  it("renders contain some text", () => {
    render(<CardCategory category={categories.pc} />);
    expect(screen.getByText("PC")).toBeInTheDocument();
  });

  it("CardCategory snapshot", () => {
    render(<CardCategory category={categories.xbox} />);
    expect(document.body).toMatchSnapshot();
  });
});
