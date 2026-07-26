const formatAndValidateDateOfBirth = (
  dataInput: string | Date | null | undefined,
): string | null | Date => {
  if (!dataInput) return null;

  const data = dataInput instanceof Date ? dataInput : new Date(dataInput);

  if (isNaN(data.getTime())) return null;

  const hoje = new Date();
  const dataMinima = new Date();
  dataMinima.setFullYear(hoje.getFullYear() - 120);

  if (data > hoje || data < dataMinima) {
    return null;
  }

  return new Date(data.toISOString().substring(0, 10));
};

export { formatAndValidateDateOfBirth };
