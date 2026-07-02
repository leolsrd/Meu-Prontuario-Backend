const checkBoooleanStringConvertInBoolean = (
  value: string | undefined | boolean,
): boolean => {
  // return value === "true" ? true : false;

  return value === undefined
    ? true
    : typeof value === "string"
      ? (() => {
          const normalizedStatus = value.trim().toLowerCase();

          if (normalizedStatus === "true") return true;
          if (normalizedStatus === "false") return false;

          throw new Error("O campo status deve ser 'true' ou 'false'");
        })()
      : value;
};

export default checkBoooleanStringConvertInBoolean;
