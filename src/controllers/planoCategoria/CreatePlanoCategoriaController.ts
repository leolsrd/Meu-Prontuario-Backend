import { Request, Response } from "express";
import { CreatePlanoCategoriaService } from "../../services/planoCategoria/CreatePlanoCategoriaService";

class CreatePlanoCategoriaController {
  async handle(req: Request, res: Response) {
    try {
      const data = req.body;

      const planoCategoriaService = new CreatePlanoCategoriaService();

      const planoCategoria = await planoCategoriaService.execute(data);

      return res.status(201).json(planoCategoria);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });

      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export { CreatePlanoCategoriaController };
