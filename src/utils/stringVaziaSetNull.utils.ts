const StringVaziaOrUndefinedSetNull = (
  val: string | null | undefined,
): string | null => {
  if (val?.trim() === "" || val === undefined || val === null) {
    return null;
  }
  return val;
};

export { StringVaziaOrUndefinedSetNull };
