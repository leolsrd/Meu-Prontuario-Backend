import { IMedicoEspecialidadeProps } from "./medicoEspecialidade.types";
import {
  CreateFuncionarioServiceProps,
  UpdateFuncionarioServiceProps,
} from "./funcionario.types";

export interface MedicoServiceProps
  extends CreateFuncionarioServiceProps, IMedicoEspecialidadeProps {
  crm: string;
  ufCRM: string;
  rqe?: string;
  especialidade?: IMedicoEspecialidadeProps[];
}

export interface CreateMedicoServiceProps {
  crm: string;
  ufCRM: string;
}

export interface UpdateMedicoServiceProps extends UpdateFuncionarioServiceProps {
  idMedico: string;
  crm?: string;
  ufCRM?: string;
}
