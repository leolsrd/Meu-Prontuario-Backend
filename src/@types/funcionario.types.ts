export interface CreateFuncionarioServiceProps {
  login: string;
  nome: string;
  idFuncao: string;
  status?: boolean;
  cpfCnpj?: string | null;
  senha?: string;
  telefone?: string | null;
  dataNascimento?: Date;
  cep?: string | null;
  logradouro?: string | null;
  complemento?: string | null;
  numero?: number;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
}

export interface UpdateFuncionarioServiceProps {
  idFuncionario: string;
  login?: string;
  nome?: string;
  idFuncao?: string;
  status?: boolean;
  cpfCnpj?: string | null;
  senha?: string;
  telefone?: string | null;
  dataNascimento?: Date;
  cep?: string | null;
  logradouro?: string | null;
  complemento?: string | null;
  numero?: number;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
}
