import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./formEditModal.css";
import { addGame, deleteGame } from "@/store/actionCreators/adminActions";
import Modal from "@/components/modal/modal";

const FormEditModal = ({ game, onSubmit }) => {
  // const game = useSelector((state: RootState) => state.reqGame.game[0]);
  const dispatch = useDispatch();

  const [newGame, setNewGame] = useState(null);

  const [editFormData, setEditFormData] = useState({
    name: game.name,
    id: game.id,
    img: game.img,
    genres: game.genres,
    age: game.age,
    price: game.price,
    categories: game.categories,
    description: game.description,
  });

  const [hasCategory, setHasCategory] = useState({
    hasPC: !!editFormData.categories.includes("pc"),
    hasPS: !!editFormData.categories.includes("playstation"),
    hasXbox: !!editFormData.categories.includes("xbox"),
  });

  useEffect(() => {
    const savedCategory = [];
    if (hasCategory.hasPC) savedCategory.push("pc");
    if (hasCategory.hasPS) savedCategory.push("playstation");
    if (hasCategory.hasXbox) savedCategory.push("xbox");

    setEditFormData({ ...editFormData, categories: savedCategory });
  }, [hasCategory]);

  const [editContactId, setEditContactId] = useState(null);

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
    onSubmit();
    // const editedGame = {
    //   gameID: editFormData.gameID,
    //   gameName: editFormData.gameName,
    //   gameGenres: editFormData.gameGenres,
    //   gamePrice: editFormData.gamePrice,
    //   gameImg: editFormData.gameImg,
    //   gameDescription: editFormData.gameDescription,
    //   gameAge: editFormData.gameAge,
    //   gameCategory: editFormData.gameCategory,
    // };
    // setNewGame(editedGame);
    dispatch(addGame(editFormData));
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const onChangeSelect = (e) => {
    setEditFormData({ ...editFormData, age: e.target.value });
    console.log(e.target.value);
  };

  return (
      <form>
        <label className="label-product">
          Name
          <input
            type="text"
            value={editFormData.name}
            name="name"
            required="required"
            onChange={handleEditFormChange}
          />
        </label>

        <label className="label-product">
          Genre
          <input
            type="text"
            value={editFormData.genres}
            name="genres"
            required="required"
            // placeholder={game.genres}
            onChange={handleEditFormChange}
          />
        </label>

        <label className="label-product">
          Price
          <input
            type="text"
            value={editFormData.price}
            name="price"
            required="required"
            // placeholder={game.price}
            onChange={handleEditFormChange}
          />
        </label>

        <label className="label-product">
          Img
          <input
            type="email"
            value={editFormData.img}
            name="img"
            required="required"
            // placeholder={game.img}
            onChange={handleEditFormChange}
          />
        </label>

        <label className="label-product">
          Description
          <textarea
            type="email"
            className="description-textarea"
            value={editFormData.description}
            name="description"
            required="required"
            // placeholder={game.description}
            onChange={handleEditFormChange}
          />
        </label>

        <label className="label-product">
          Age
          <select name="select" defaultValue={editFormData.age} onChange={onChangeSelect}>
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
          Edit Card
        </button>
        <button type="submit" onClick={() => dispatch(deleteGame(editFormData.id))}>
          Delete Card
        </button>
      </form>
  );
};

export default FormEditModal;
