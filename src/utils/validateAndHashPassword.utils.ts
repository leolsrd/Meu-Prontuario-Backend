import { hash } from "bcryptjs";

const validateAndHashPassword = async (
  password: string | null | undefined,
  defaultPassword?: string,
): Promise<string> => {
  let finalPassword = password?.trim();

  if (!finalPassword) {
    finalPassword =
      defaultPassword || process.env.SENHA_FUNCIONARIO_TESTE || "";
  }

  if (!finalPassword) {
    throw new Error("Nenhuma senha fornecida e não há padrão configurado");
  }

  const senhaHash = await hash(finalPassword, 8);
  return senhaHash;
};

export { validateAndHashPassword };
