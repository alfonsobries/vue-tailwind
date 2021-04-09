const isNumeric = (char: string | number): boolean => /^\d+$/.test(String(char));
export default isNumeric;
