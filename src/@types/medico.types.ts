import { CreateFuncionarioServiceProps } from "./funcionario.types";

export interface CreateMedicoServiceProps {
  crm: string;
  ufCRM: string;
  especialidade: string;
}

export interface MedicoServiceProps extends CreateFuncionarioServiceProps {
  crm: string;
  ufCRM: string;
  especialidade: string;
}
