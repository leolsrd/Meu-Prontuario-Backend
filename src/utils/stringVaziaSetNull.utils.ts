const StringVaziaOrUndefinedSetNull = (val: string | null) => {
  if (val?.trim() === "" || val === undefined) {
    return null;
  }
  return val;
};

export { StringVaziaOrUndefinedSetNull };
