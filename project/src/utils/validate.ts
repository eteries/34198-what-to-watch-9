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

export const setInvalidClass = (
  element: HTMLInputElement,
  className: string,
  target:HTMLElement = element,
): string | void  => {
  if (element.validity.valid) {
    target.classList.remove(className);
    return;
  }
  target.classList.add(className);
};
