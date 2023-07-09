import { useCallback, useState } from 'react';

function useValidation() {
  const [state, setState] = useState({
    inputValues: {},
    inputErrors: {},
    inputValid: false,
  });

  const handleChange = useCallback((evt) => {
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const validationMessage = target.validationMessage;
    const formIsValid = evt.target.closest('form').checkValidity();

    setState({
      inputValues: { ...state.inputValues, [ name ]: value },
      inputErrors: { ...state.inputErrors, [ name ]: validationMessage },
      inputValid: formIsValid,
    });
  }, [state, setState]);

  const resetForm = useCallback(
    (inputValues = {}, inputErrors = {}, inputValid = false) => {
      setState({
        inputValues: inputValues,
        inputErrors: inputErrors,
        inputValid: inputValid,
      });
    },
    [setState]
  );
  return {
    ...state,
    resetForm,
    setState,
    handleChange,
  };
}

export default useValidation;
