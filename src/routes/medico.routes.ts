import { Router } from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated";
import { validateSchema } from "../middlewares/validateSchema";
import { ListMedicoController } from "../controllers/medico/ListMedicoController";
import {
  listMedicoEspecialidade,
  listMedicoStatus,
} from "../schemas/medicoSchema";

const medicoRoutes: Router = Router();

// ? Rota para criar médico é a mesma de criar funcionário.
// ? Na classe CreateFuncionarioService checa a função enviada se "Médico".
// ? Se sim, valida e cria o cadastro do médico.

// ? Rota para listar todos médicos
medicoRoutes.get(
  "/medicos",
  isAuthenticated,
  new ListMedicoController().getMedicoAll,
);

// ? Rota para listar os médicos por status
medicoRoutes.get(
  "/medicos/status",
  isAuthenticated,
  validateSchema(listMedicoStatus),
  new ListMedicoController().listMedicoStatus,
);

// ? Rota para listar os médicos por especialidade
medicoRoutes.get(
  "/medicos/especialidade",
  isAuthenticated,
  validateSchema(listMedicoEspecialidade),
  new ListMedicoController().listMedicoEspecialidade,
);

export default medicoRoutes;
