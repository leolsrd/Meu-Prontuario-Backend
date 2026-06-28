import { Request, Response } from "express";
import { CreateEspecialidadeService } from "../../services/especialidade/CreateEspecialidadeService";

class CreateEspecialidadeController {
  async handle(req: Request, res: Response) {
    try {
      const data = req.body;

      const createEspecialidadeService = new CreateEspecialidadeService();

      const especialidade = await createEspecialidadeService.execute(
        req,
        res,
        data,
      );

      return res.status(201).json(especialidade);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateEspecialidadeController };
