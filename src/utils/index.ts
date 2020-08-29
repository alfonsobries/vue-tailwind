export const pad = (number: string | number, length = 2) : string => `000${number}`.slice(length * -1);

export const int = (bool: boolean) : 1 | 0 => (bool === true ? 1 : 0);
