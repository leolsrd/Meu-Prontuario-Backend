export interface CreateFuncaoServiceProps {
  funcao: string;
  status?: boolean;
  descricao?: string | null;
}

export interface UpdateFuncaoServiceProps {
  idFuncao: string;
  status?: boolean;
  funcao?: string;
  descricao?: string | null;
}
