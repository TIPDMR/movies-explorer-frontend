import React, { useState } from 'react';
import useValidation from "../../hooks/useValidation";
import { Link } from "react-router-dom";

const Profile = ({ summaryErrors = "При обновлении профиля произошла ошибка." }) => {
  const {
    inputValues,
    inputErrors,
    inputValid,
    handleChange
  } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    setButtonEdit(!buttonEdit);
  }

  const [buttonEdit, setButtonEdit] = useState(false);

  const handleEditProfile = () => {
    setButtonEdit(!buttonEdit);
  };

  const formSettingsLocal = {
    formClassName: "profile__form",
    fieldsetClassName: "profile__fieldset",
    labelClassName: "profile__label",
    inputClassName: "profile__input",
    inputErrorClassName: "profile__input_error",
    textErrorClassName: "profile__input-text-error",
    summaryErrorClassName: "profile__errors-summary",
    buttonClassName: "profile__button",
    buttonDisableClassName: "profile__button_disable"
  };
  const inputFields = [
    {
      name: "name",
      id: "name",
      label: "Имя",
      placeholder: "Имя",
      type: "text",
      pattern: "[a-zA-Zа-яА-ЯёЁ]{3,30}",
      required: true
    },
    {
      name: "email",
      id: "email",
      label: "E-mail",
      placeholder: "E-mail",
      type: "email",
      required: true
    }
  ];
  const formInputs = inputFields.map((input, index) => (
    <fieldset key={index} className={formSettingsLocal.fieldsetClassName}>
      <label className={formSettingsLocal.labelClassName}>{input.label}</label>
      <input
        name={input.name}
        id={input.name}
        className={`${formSettingsLocal.inputClassName} ${inputErrors[ input.name ] ? formSettingsLocal.inputErrorClassName : ''}`}
        placeholder={input.label}
        minLength={input.minLength}
        maxLength={input.maxLength}
        type={input.type}
        pattern={input.pattern}
        value={inputValues[ input.name ] || ''}
        onChange={handleChange}
        required
      />
      <span className={formSettingsLocal.textErrorClassName}>
        {inputErrors[ input.name ]}
      </span>
    </fieldset>
  ));
  return (
    <main className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className={formSettingsLocal.formClassName} onSubmit={handleSubmit} action="#">
        {formInputs}
        <span className={formSettingsLocal.summaryErrorClassName}>{buttonEdit && summaryErrors}</span>
        {buttonEdit ?
          (<button disabled={!inputValid} type="submit" className={`${formSettingsLocal.buttonClassName} ${inputValid ? '' : formSettingsLocal.buttonDisableClassName}`}>
            Сохранить
          </button>)
          :
          (
            <nav className="profile__navigation">
              <button className="profile__button-edit" onClick={handleEditProfile}>Редактировать</button>
              <Link className="profile__link profile__link_red" to="/signout">Выйти из аккаунта</Link>
            </nav>
          )
        }

      </form>
    </main>
  );
};

export default Profile;
