export const setValidator = (
  control: HTMLInputElement,
  validator: keyof ValidityState,
  message: string,
): void => {
  control.validity[validator]
    ? control.setCustomValidity(message)
    : control.setCustomValidity('');

  control.reportValidity();
};
