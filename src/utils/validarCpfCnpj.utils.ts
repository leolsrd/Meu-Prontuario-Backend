const validarCpfCnpj = (value: string | null | undefined) => {
  if (!value) return null;

  const somenteDigitos = value.replace(/\D/g, "");

  if (!somenteDigitos) return null;

  if (somenteDigitos.length !== 11 && somenteDigitos.length !== 14) {
    throw new Error("CPF/CNPJ inválido");
  }

  const digitosRepetidos = /^(\d)\1+$/;
  if (digitosRepetidos.test(somenteDigitos)) {
    throw new Error("CPF/CNPJ inválido");
  }

  return somenteDigitos;
};

export { validarCpfCnpj };
