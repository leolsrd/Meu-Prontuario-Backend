/**
 * Usar apenas em campos que aceitam valores null no banco de dados.
 * Não deve-se usar essa função em campos obrigatórios (nome, cpfCnpj) campos númericos e booleanos
 * @param { string | null | undefined } val
 * @returns { string | null | undefined }
 */
const stringToNullUpdate = (
  val: string | null | undefined,
): string | null | undefined => {
  // Se for estritamente undefined, retorna undefined (o Prisma ignora e não mexe no banco)
  if (val === undefined) return undefined;

  // Se for nulo ou string vazia, retorna null (o usuário quer apagar a informação)
  if (val === null || val.trim() === "") return null;

  return val.trim();
};

export default stringToNullUpdate;
