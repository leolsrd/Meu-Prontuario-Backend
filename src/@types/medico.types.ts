import {
  CreateFuncionarioServiceProps,
  UpdateFuncionarioServiceProps,
} from "./funcionario.types";

export interface MedicoServiceProps extends CreateFuncionarioServiceProps {
  crm: string;
  ufCRM: string;
  especialidade: string;
}

export interface CreateMedicoServiceProps {
  crm: string;
  ufCRM: string;
  especialidade: string;
}

export interface UpdateMedicoServiceProps extends UpdateFuncionarioServiceProps {
  idMedico: string;
  crm?: string;
  ufCRM?: string;
  especialidade?: string;
}
