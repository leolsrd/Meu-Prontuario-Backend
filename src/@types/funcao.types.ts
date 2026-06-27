export interface CreateFuncaoServiceProps {
  nome: string;
  status?: boolean;
  descricao?: string | null;
}

export interface UpdateFuncaoServiceProps {
  idFuncao: string;
  status?: boolean;
  nome?: string;
  descricao?: string | null;
}
