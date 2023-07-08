import React, { useContext, useEffect } from 'react';
import useValidation from "../../hooks/useValidation";
import { CurrentUser } from '../../contexts/CurrentUser';

const Profile = (
  {
    onSignOut,
    isLoading,
    onUpdateProfile,
    isButtonEditProfile,
    onButtonEditProfile
  }) => {

  const { name, email } = useContext(CurrentUser);
  const {
    inputValues,
    inputErrors,
    inputValid,
    handleChange
  } = useValidation();

  useEffect(() => {
    inputValues[ 'name' ] = name;
    inputValues[ 'email' ] = email;
    return () => {
      inputValues[ 'name' ] = '';
      inputValues[ 'email' ] = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateProfile(inputValues.name, inputValues.email);
  }

  const handleEditProfile = () => {
    onButtonEditProfile(true);
  };

  function handleSelect(evt) {
    evt.target.select();
  }

  function handleSignOut() {
    onSignOut();
  }

  const formSettingsLocal = {
    formClassName: "profile__form",
    fieldsetClassName: "profile__fieldset",
    labelClassName: "profile__label",
    inputClassName: "profile__input",
    inputErrorClassName: "profile__input_error",
    textErrorClassName: "profile__input-text-error",
    summaryErrorClassName: "profile__errors-summary",
    buttonEditClassName: "profile__button-edit",
    buttonEditDisableClassName: "profile__button-edit_disable"
  };

  const inputFields = [
    {
      name: "name",
      id: "name",
      label: "Имя",
      placeholder: "Имя",
      type: "text",
      pattern: "[a-zA-Zа-яА-Я\\-\\s]{3,30}",
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
        onClick={handleSelect}
        required
      />
      <span className={formSettingsLocal.textErrorClassName}>
        {inputErrors[ input.name ]}
      </span>
    </fieldset>
  ));
  return (
    <main className="profile">
      <h1 className="profile__title">Привет, {name}!</h1>
      <form className={formSettingsLocal.formClassName} onSubmit={handleSubmit} action="#">
        {formInputs}
        <div className="profile__container-buttons">
          {isButtonEditProfile ?
            (<button
              disabled={isLoading || !inputValid}
              type="submit"
              className={`${formSettingsLocal.buttonEditClassName} ${(!isLoading && inputValid) ? '' : formSettingsLocal.buttonEditDisableClassName}`}>
              Сохранить
            </button>)
            :
            (
              <nav className="profile__navigation">
                <button
                  type="button"
                  disabled={isLoading || !inputValid}
                  className={`profile__button ${!isLoading && inputValid ? '' : 'profile__button_disable'}`}
                  onClick={handleEditProfile}>Редактировать
                </button>
                <button type="button" className="profile__button profile__button_red" onClick={handleSignOut}>Выход</button>
              </nav>
            )
          }
        </div>
      </form>
    </main>
  );
};

export default Profile;
