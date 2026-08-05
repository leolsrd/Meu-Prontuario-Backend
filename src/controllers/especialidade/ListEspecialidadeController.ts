import { Request, Response } from "express";
import ListEspecialidadeService from "../../services/especialidade/ListEspecialidadeService";

class ListEspecialidadeController {
  async getAll(req: Request, res: Response) {
    try {
      const listEspecialidadeService = new ListEspecialidadeService();

      const especialidades = await listEspecialidadeService.getAll();

      return res.status(200).json({
        message: "Especialidades listadas com sucesso",
        especialidades,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });

      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async getEspecialidadeStatus(req: Request, res: Response) {
    try {
      const status: boolean = req.params.status === "true" ? true : false;

      const listEspecialidadeService = new ListEspecialidadeService();

      const especialidades =
        await listEspecialidadeService.getEspecialidadeStatus(status);

      return res.status(200).json(especialidades);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });

      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export default ListEspecialidadeController;
