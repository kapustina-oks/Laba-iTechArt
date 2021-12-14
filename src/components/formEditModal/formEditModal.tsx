import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers/rootReducer";
import "./formEditModal.css";

const FormEditModal = () => {
  const game = useSelector((state: RootState) => state.reqGame.game[0]);

  const [editFormData, setEditFormData] = useState({
    gameName: game.name,
    gameGenres: game.genres,
    gamePrice: game.price,
    gameImg: game.img,
    gameDescription: game.description,
    gameAge: game.age,
    gameCategory: game.categories,
  });

  const [hasCategory, setHasCategory] = useState({
    hasPC: !!editFormData.gameCategory.includes("pc"),
    hasPS: !!editFormData.gameCategory.includes("playstation"),
    hasXbox: !!editFormData.gameCategory.includes("xbox"),
  });

  useEffect(() => {
    const savedCategory = [];
    if (hasCategory.hasPC) savedCategory.push("pc");
    if (hasCategory.hasPS) savedCategory.push("playstation");
    if (hasCategory.hasXbox) savedCategory.push("xbox");

    setEditFormData({ ...editFormData, gameCategory: savedCategory });
  }, [hasCategory]);

  const [editContactId, setEditContactId] = useState(null);

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  return (
    <form onSubmit={handleEditFormSubmit}>
      <input
        type="text"
        value={editFormData.gameName}
        name="gameName"
        required="required"
        onChange={handleEditFormChange}
      />
      <input
        type="text"
        value={editFormData.gameGenres}
        name="gameGenres"
        required="required"
        //placeholder={game.genres}
        onChange={handleEditFormChange}
      />
      <input
        type="text"
        value={editFormData.gamePrice}
        name="gamePrice"
        required="required"
        //placeholder={game.price}
        onChange={handleEditFormChange}
      />
      <input
        type="email"
        value={editFormData.gameImg}
        name="gameImg"
        required="required"
        //placeholder={game.img}
        onChange={handleEditFormChange}
      />
      <textarea
        type="email"
        className="description-textarea"
        value={editFormData.gameDescription}
        name="gameDescription"
        required="required"
        //placeholder={game.description}
        onChange={handleEditFormChange}
      />
      <select className="select" name="select" defaultValue={editFormData.gameAge}>
        <option value="6+">6+</option>
        <option value="12+">12+</option>
        <option value="18+">18+</option>
      </select>
      <input
        type="checkbox"
        id="xbox"
        defaultChecked={hasCategory.hasXbox}
        onChange={() => setHasCategory({ ...hasCategory, hasXbox: !hasCategory.hasXbox })}
      />
      <input
        type="checkbox"
        id="pc"
        defaultChecked={hasCategory.hasPC}
        onChange={() => setHasCategory({ ...hasCategory, hasPC: !hasCategory.hasPC })}
      />
      <input
        type="checkbox"
        id="playstation"
        defaultChecked={hasCategory.hasPS}
        onChange={() => setHasCategory({ ...hasCategory, hasPS: !hasCategory.hasPS })}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default FormEditModal;
