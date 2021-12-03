import { ChangeEvent, FC, FocusEvent, SyntheticEvent, useEffect, useState } from "react";
import "./profile.css";
import Modal from "@/components/modal/modal";
import { useDispatch } from "react-redux";
import { usersSaveProfile } from "@/services/dataService";
import { userNameAction } from "@/store/actionCreators/userNameAction";

const Profile: FC = (): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [nameDirtyErr, setNameDirtyErr] = useState<string>("Username не может быть пустым");
  const [nameDirty, setNameDirty] = useState<boolean>(false);

  const [description, setDescription] = useState<string>("");
  const [descriptionDirtyErr, setDescriptionDirtyErr] = useState<string>("Описание не может быть пустым");
  const [descriptionDirty, setDescriptionDirty] = useState<boolean>(false);

  const [photo, setPhoto] = useState<string>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  const [formValid, setFormValid] = useState<boolean>(false);
  const [data, setData] = useState({
    name,
    description,
    photo,
  });

  const [isModalPassword, setIsModalPassword] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleSubmitForm = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(data);
    usersSaveProfile("/api/saveProfile", data).then((res) => {
      if (res.ok) {
        dispatch(userNameAction(name));
        const oldUserName = localStorage.getItem("user");
        if (oldUserName) localStorage.setItem("user", name);
        console.log(res);
      }
    });
  };

  useEffect(() => {
    if (nameDirtyErr || descriptionDirtyErr) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameDirtyErr, descriptionDirtyErr]);

  const imageHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.types)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(selected);
        localStorage.setItem("photo", photo);
      };
      reader.readAsDataURL(selected);
    } else {
      console.log("file not supported");
    }
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setData({ ...data, name: e.target.value });
    setName(nameValue);
    if (!/^[a-zA-Z1-9]+$/.test(nameValue)) {
      setNameDirtyErr("В Username должно быть латинские буквы/цифры");
    } else if (nameValue.length < 4 || nameValue.length > 20) {
      setNameDirtyErr("В Username должно быть от 4 до 20 символов");
    } else if (parseInt(nameValue.substr(0, 1), 10)) {
      setNameDirtyErr("Username должен начинаться с буквы");
    } else if (!nameValue) {
      setNameDirtyErr("Username не может быть пустым");
    } else {
      setNameDirtyErr("");
    }
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const descriptionValue = e.target.value;
    setData({ ...data, description: e.target.value });
    setDescription(descriptionValue);
    if (descriptionValue.length < 10 || descriptionValue.length > 250) {
      setDescriptionDirtyErr("В описании должно быть от 10 до 250 символов");
    } else if (!descriptionValue) {
      setDescriptionDirtyErr("Описание не может быть пустым");
    } else {
      setDescriptionDirtyErr("");
    }
  };

  const blurHandler = (e: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "description":
        setDescriptionDirty(true);
        break;
      default:
        break;
    }
  };

  const openPasswordModal = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    setIsModalPassword(true);
  };

  const closePasswordModal = (): void => {
    setIsModalPassword(false);
  };

  return (
    <div className="container">
      <div className="grid_profile">
        <div className="photo">
          <div className="img-holder">
            <img src={photo} alt="user" id="photo" className="photo-img" />
          </div>
          <input
            className="image-upload"
            type="file"
            accept="image/*"
            name="image-upload"
            id="input"
            onClick={imageHandler}
          />
        </div>
        <form className="profile-form">
          <div className="group-profile">
            <label htmlFor="name">
              Username
              {nameDirty ? <div style={{ color: "red", fontSize: "13px" }}>{nameDirtyErr}</div> : null}
              <input
                className="input-form"
                type="text"
                id="name"
                name="name"
                value={name}
                onBlur={blurHandler}
                onChange={handleChangeName}
              />
            </label>
          </div>
          <div className="group-profile">
            <label htmlFor="message">
              Profile description
              {descriptionDirty ? <div style={{ color: "red", fontSize: "13px" }}>{descriptionDirtyErr}</div> : null}
              <textarea
                className="input-form"
                type="text"
                id="description"
                name="description"
                value={description}
                onBlur={blurHandler}
                onChange={handleChangeDescription}
              />
            </label>
          </div>
          <div className="btn-group">
            <button type="submit" disabled={!formValid} className="profile-btn" onClick={handleSubmitForm}>
              Save profile
            </button>
            <button type="submit" className="profile-btn" onClick={openPasswordModal}>
              Change password
            </button>
          </div>
        </form>
      </div>
      {isModalPassword ? <Modal title="Change Password" onSubmit={closePasswordModal} /> : null}
    </div>
  );
};

export default Profile;
