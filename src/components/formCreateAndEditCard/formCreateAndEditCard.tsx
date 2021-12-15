import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./formCreateAndEditCard.css";
import { editNewGame, createNewGame } from "@/store/actionCreators/adminActions";
import mockServerHelper from "webpack-mock-server/lib/mockServerHelper";
import { dataItems } from "@/types/types";
import Modal from "@/components/modal/modal";

interface IFormCreateAndEditCard {
  onSubmit: () => void;
  game?: dataItems | undefined;
}

const FormCreateAndEditCard = ({ onSubmit, game }: IFormCreateAndEditCard) => {
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [formCreateAndEditCard, setFormCreateAndEditCard] = useState(
    game
      ? {
          name: game.name,
          id: game.id,
          img: game.img,
          genres: game.genres,
          age: game.age,
          price: game.price,
          categories: game.categories,
          description: game.description,
        }
      : {
          name: "",
          id: mockServerHelper.getUniqueIdInt(),
          img: "",
          genres: "",
          age: "6+",
          price: "0$",
          categories: [],
          description: "",
        }
  );

  const [hasCategory, setHasCategory] = useState({
    hasPC: formCreateAndEditCard.categories.includes("pc"),
    hasPS: formCreateAndEditCard.categories.includes("playstation"),
    hasXbox: formCreateAndEditCard.categories.includes("xbox"),
  });

  useEffect(() => {
    const savedCategory = [];
    if (hasCategory.hasPC) savedCategory.push("pc");
    if (hasCategory.hasPS) savedCategory.push("playstation");
    if (hasCategory.hasXbox) savedCategory.push("xbox");

    setFormCreateAndEditCard({ ...formCreateAndEditCard, categories: savedCategory });
  }, [hasCategory]);

  const handleEditFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("submit");
    onSubmit();

    if (game) {
      dispatch(editNewGame(formCreateAndEditCard));
    } else {
      dispatch(createNewGame(formCreateAndEditCard));
    }
  };

  const onChangeSelect = (e: { target: { value: string } }) => {
    setFormCreateAndEditCard({ ...formCreateAndEditCard, age: e.target.value });
    console.log(e.target.value);
  };

  const handleEditFormChange = (e: ChangeEvent) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...formCreateAndEditCard };
    newFormData[fieldName] = fieldValue;

    setFormCreateAndEditCard(newFormData);
  };

  return (
    <form>
      <label className="label-product">
        Name
        <input type="text" value={formCreateAndEditCard.name} name="name" onChange={handleEditFormChange} />
      </label>

      <label className="label-product">
        Genre
        <input type="text" value={formCreateAndEditCard.genres} name="genres" onChange={handleEditFormChange} />
      </label>

      <label className="label-product">
        Price
        <input type="text" value={formCreateAndEditCard.price} name="price" onChange={handleEditFormChange} />
      </label>

      <label className="label-product">
        Img
        <input type="text" value={formCreateAndEditCard.img} name="img" onChange={handleEditFormChange} />
      </label>

      <label className="label-product">
        Description
        <textarea
          className="description-textarea"
          value={formCreateAndEditCard.description}
          name="description"
          onChange={handleEditFormChange}
        />
      </label>

      <label className="label-product">
        Age
        <select name="select" defaultValue={formCreateAndEditCard.age} onChange={onChangeSelect}>
          <option value="6+">6+</option>
          <option value="12+">12+</option>
          <option value="18+">18+</option>
        </select>
      </label>

      <label className="label-product">
        Xbox
        <input
          className="checkbox"
          type="checkbox"
          id="xbox"
          defaultChecked={hasCategory.hasXbox}
          onChange={() => setHasCategory({ ...hasCategory, hasXbox: !hasCategory.hasXbox })}
        />
      </label>

      <label className="label-product">
        PC
        <input
          className="checkbox"
          type="checkbox"
          id="pc"
          defaultChecked={hasCategory.hasPC}
          onChange={() => setHasCategory({ ...hasCategory, hasPC: !hasCategory.hasPC })}
        />
      </label>

      <label className="label-product">
        Playstation
        <input
          className="checkbox"
          type="checkbox"
          id="playstation"
          defaultChecked={hasCategory.hasPS}
          onChange={() => setHasCategory({ ...hasCategory, hasPS: !hasCategory.hasPS })}
        />
      </label>

      <button type="submit" onClick={handleEditFormSubmit}>
        Submit
      </button>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          setDeleteModal(true);
        }}
      >
        Delete Card
      </button>
      {deleteModal && <Modal title="Delete Card" gameID={formCreateAndEditCard.id} onSubmit={() => setDeleteModal(false)} />}
    </form>
  );
};

export default FormCreateAndEditCard;
