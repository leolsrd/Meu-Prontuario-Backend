const removeUndefinedFields = (value: string | null | undefined) => {
  if (value !== undefined) {
    return value;
  }
  return value;
};

export { removeUndefinedFields };
