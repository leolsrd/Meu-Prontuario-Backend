import { Request, Response } from "express";
import { UpdateFuncionarioService } from "../../services/funcionario/UpdateFuncionarioService";

class UpdateFuncionarioController {
  async handle(req: Request, res: Response) {
    const idFuncionario = req.params.idFuncionario;
    const data = req.body;
    data.idFuncionario = idFuncionario;

    const updateFuncionarioService = new UpdateFuncionarioService();

    const funcionario = await updateFuncionarioService.execute(data);

    return res.status(200).json(funcionario);
  }
}

export { UpdateFuncionarioController };
