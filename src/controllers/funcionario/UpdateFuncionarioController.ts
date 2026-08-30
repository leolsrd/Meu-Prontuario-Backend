import { Request, Response } from "express";
import { UpdateFuncionarioService } from "../../services/funcionario/UpdateFuncionarioService";

class UpdateFuncionarioController {
  async handle(req: Request, res: Response) {
    try {
      const idFuncionario = req.params.idFuncionario;
      const data = req.body;
      data.idFuncionario = idFuncionario;

      const updateFuncionarioService = new UpdateFuncionarioService();

      const funcionario = await updateFuncionarioService.execute(data);

      return res.status(200).json(funcionario);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });

      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export { UpdateFuncionarioController };
