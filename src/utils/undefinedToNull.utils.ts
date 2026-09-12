const undefinedToNull = (value: string | null | undefined): string | null => {
  return value === undefined ? null : value;
};

export { undefinedToNull };
