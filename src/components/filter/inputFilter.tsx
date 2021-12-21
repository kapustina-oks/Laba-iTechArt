import { ChangeEvent } from "react";

interface IInputForm {
  title: string;
  value: string | number;
  name: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

const InputFilter = ({ name, onChange, data, value, checked, title }: IInputForm) => (
  <label className="filter">
    <input
      className="with-gap"
      onChange={onChange}
      name={name}
      type="radio"
      data-genre="all"
      checked={checked}

    />
    <span className="label">{title}</span>
  </label>
);

export default InputFilter;
