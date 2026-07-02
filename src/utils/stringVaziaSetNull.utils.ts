const StringVaziaOrUndefinedSetNull = (val: string | null | undefined) => {
  if (val?.trim() === "" || val?.trim() === undefined) {
    return null;
  }
  return val.trim();
};

export { StringVaziaOrUndefinedSetNull };
