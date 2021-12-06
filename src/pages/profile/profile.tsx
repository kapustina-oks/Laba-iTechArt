import { ChangeEvent, FC, FocusEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import "./profile.css";
import Modal from "@/components/modal/modal";
import { useDispatch } from "react-redux";
import { usersSaveProfile } from "@/services/dataService";
import { userNameAction } from "@/store/actionCreators/userNameAction";
import { validateDescription, validateLogin } from "@/utils/validation";

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
    id: localStorage.getItem("id"),
  });

  const [isModalPassword, setIsModalPassword] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const img = localStorage.getItem("photo");
    if (img) {
      setPhoto(img);
    }
  }, [photo]);

  const handleSubmitForm = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(data);
    usersSaveProfile("/api/saveProfile", data)
      .then((res) => {
        if (res.ok) {
          dispatch(userNameAction(name));
          const oldUserName = localStorage.getItem("user");
          if (oldUserName) localStorage.setItem("user", name);
          console.log(res);
          alert("Profile saved.");
        }
      })
      .catch(() => alert("Something went wrong..."));
  };

  useEffect(() => {
    if (nameDirtyErr || descriptionDirtyErr) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameDirtyErr, descriptionDirtyErr]);

  const imgRef = useRef<HTMLInputElement>(null);

  const imageHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!imgRef.current?.files) return;
    const selected = imgRef.current.files[0];
    if (selected) {
      const reader = new FileReader();
      reader.readAsDataURL(selected);
      reader.onloadend = () => {
        setPhoto(reader.result as string);
        setData({ ...data, photo: reader.result as string });
        if (typeof reader.result === "string") {
          localStorage.setItem("photo", reader.result);
        }
      };
    } else {
      console.log("file not supported");
    }
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setData({ ...data, name: e.target.value });
    setName(e.target.value);
    setNameDirtyErr(validateLogin(nameValue));
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const descriptionValue = e.target.value;
    setData({ ...data, description: e.target.value });
    setDescription(descriptionValue);
    setDescriptionDirtyErr(validateDescription(descriptionValue));
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
      <form className="profile-form">
        <div className="photo">
          <div className="img-holder">
            <img src={photo} alt="user" id="photo" className="photo-img" />
          </div>
          <input
            ref={imgRef}
            className="image-upload"
            type="file"
            accept=".jpg, .jpeg, .png"
            name="image-upload"
            id="input"
          />
          <button className="photo-btn" onClick={imageHandler}>
            Change your photo
          </button>
        </div>

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
          <label htmlFor="message">
            Profile description
            {descriptionDirty ? <div style={{ color: "red", fontSize: "13px" }}>{descriptionDirtyErr}</div> : null}
            <textarea
              className="input-form"
              id="description"
              name="description"
              value={description}
              onBlur={blurHandler}
              onChange={handleChangeDescription}
            />
          </label>
          <div className="btn-group">
            <button type="submit" disabled={!formValid} className="profile-btn" onClick={handleSubmitForm}>
              Save profile
            </button>
            <button type="submit" className="profile-btn" onClick={openPasswordModal}>
              Change password
            </button>
          </div>
        </div>
      </form>
      {isModalPassword ? <Modal title="Change Password" onSubmit={closePasswordModal} /> : null}
    </div>
  );
};

export default Profile;
