export interface CreatePacienteProps {
  id: number;
  nome: string;
  status?: boolean | null;
  cpfCnpj?: string | null;
  telefone?: string | null;
  email?: string | null;
  dataNascimento?: Date;
  sexo?: string | null;
  cep?: string | null;
  logradouro?: string | null;
  complemento?: string | null;
  numero?: number;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
  // ? Dados do plano de saúde
  convenio?: string | null; // ? Nome do plano (Unimed, Bradesco, etc.)
  categoriaPlano?: string | null; // ? Tipo de cobertura (Básico, Executivo, Nacional)
  numeroCarteiraConvenio?: string | null; // ? Numero da carteira
  validadeCarteiraConvenio?: string | null; // ? Validade da carteira
  tipoPlano?: string | null; // ? Tipo de plano (Nacional ou Regional)
  codigoANS?: string | null; // ^ Codigo é um código que identifica o plano na ANS Criar uma tabela e outra entidade para isso.
}

export interface UpdatePacienteProps {
  idPaciente: string;
  nome?: string;
  status?: boolean;
  cpfCnpj?: string | null;
  telefone?: string | null;
  email?: string;
  dataNascimento?: Date;
  sexo?: string | null;
  convenio?: string | null;
  codigoANS?: string | null;
  numeroCarteiraConvenio?: string | null;
  validadeCarteiraConvenio?: string | null;
  tipoPlano?: string | null;
  cep?: string | null;
  logradouro?: string | null;
  complemento?: string | null;
  numero?: number;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
}
