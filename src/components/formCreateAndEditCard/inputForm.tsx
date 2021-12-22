import { ChangeEvent } from "react";

interface IInputForm {
  labelTitle: string;
  value: string | number;
  name: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

const InputForm = ({ labelTitle, value, name, onChange }: IInputForm) => (
  <label className="label-product">
    {labelTitle}
    <input type="text" value={value} name={name} onChange={onChange} />
  </label>
);

export default InputForm;
