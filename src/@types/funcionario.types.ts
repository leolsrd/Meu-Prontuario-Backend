export interface CreateFuncionarioServiceProps {
  login: string;
  nome: string;
  idFuncao: string;
  // ? Pode ser nulo
  status?: boolean;
  cpfCnpj?: string;
  senha?: string;
  telefone?: string;
  dataNascimento?: Date;
  cep?: string;
  logradouro?: string;
  complemento?: string;
  numero?: number;
  bairro?: string;
  cidade?: string;
  uf?: string;
}

export interface UpdateFuncionarioServiceProps {
  idFuncionario: string;
  login?: string;
  nome?: string;
  idFuncao?: string;
  status?: boolean;
  cpfCnpj?: string;
  senha?: string;
  telefone?: string;
  dataNascimento?: Date;
  cep?: string;
  logradouro?: string;
  complemento?: string;
  numero?: number;
  bairro?: string;
  cidade?: string;
  uf?: string;
}
