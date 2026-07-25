import removeMascaraDevolveNumero from "./removeMascara.utils";

const cleanAndRemoveMask = (value: string | null | undefined): string | null => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return removeMascaraDevolveNumero(trimmed);
};

export { cleanAndRemoveMask };
