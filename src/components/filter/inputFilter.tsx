import { ChangeEvent } from "react";

interface IInputForm {
  labelTitle: string;
  value: string | number;
  name: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

const InputFilter = ({ name, onChange, data, value, filter, title }: IInputForm) => (
  <label className="filter">
    <input
      className="with-gap"
      onChange={onChange}
      name={name}

      type="radio"
      checked={filter.genre === { value }}

    />
    <span className="label">{title}</span>
  </label>
);

export default InputFilter;
