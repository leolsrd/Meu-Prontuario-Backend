export interface CreateFuncaoServiceProps {
  idFuncao: string;
  nome: string;
  status?: boolean | string;
  descricao?: string | null;
}

export interface UpdateFuncaoServiceProps {
  idFuncao: string;
  status?: boolean;
  nome?: string;
  descricao?: string | null;
}
