export const calc = (value: number, isImperial: boolean, div: number) => {
  let newValue;
  if (isImperial) {
    newValue = value / div;
  } else {
    newValue = value * div;
  }
  return newValue.toString();
};