import { useState } from 'react';

function useValidation() {
  const [state, setState] = useState({
    inputValues: {},
    inputErrors: {},
    inputValid: false,
  });

  const handleChange = (evt) => {
    const { name, value, validationMessage } = evt.target;
    const formIsValid = evt.target.closest('form').checkValidity();

    setState({
      inputValues: { ...state.inputValues, [name]: value },
      inputErrors: { ...state.inputErrors, [name]: validationMessage },
      inputValid: formIsValid,
    });
  };

  return {
    ...state,
    handleChange,
  };
}

export default useValidation;
