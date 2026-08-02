import { Request, Response } from "express";
import { UpdatePlanoCategoriaService } from "../../services/planoCategoria/UpdatePlanoCategoriaService";

class UpdatePlanoCategoriaController {
  async handle(req: Request, res: Response) {
    try {
      const idPlanoCategoria = req.params.id;
      const data = req.body;
      data.idPlanoCategoria = idPlanoCategoria;

      const updatePlanoCategoriaService = new UpdatePlanoCategoriaService();

      const planoCategoria = await updatePlanoCategoriaService.execute(data);

      return res.status(200).json(planoCategoria);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });

      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export { UpdatePlanoCategoriaController };
