import { useState } from "react";

const FormEditModal = () => {
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

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
        name="fullName"
        required="required"
        placeholder="Enter a name..."
        onChange={handleEditFormChange}
      />
      <input
        type="text"
        name="address"
        required="required"
        placeholder="Enter an addres..."
        onChange={handleEditFormChange}
      />
      <input
        type="text"
        name="phoneNumber"
        required="required"
        placeholder="Enter a phone number..."
        onChange={handleEditFormChange}
      />
      <input
        type="email"
        name="email"
        required="required"
        placeholder="Enter an email..."
        onChange={handleEditFormChange}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default FormEditModal;
