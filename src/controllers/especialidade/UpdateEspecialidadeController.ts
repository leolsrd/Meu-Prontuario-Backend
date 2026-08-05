import { Request, Response } from "express";
import { UpdateEspecialidadeService } from "../../services/especialidade/UpdateEspecialidadeService";

class UpdateEspecialidadeController {
  async handle(req: Request, res: Response) {
    try {
      const idEspecialidade = req.params.id;
      const data = req.body;
      data.idEspecialidade = idEspecialidade;

      const updateEspecialidadeService = new UpdateEspecialidadeService();

      const especialidade = await updateEspecialidadeService.execute(data);

      return res.status(200).json({
        message: "Especialidade atualizada com sucesso",
        especialidade,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });

      if (error instanceof Error)
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export { UpdateEspecialidadeController };
