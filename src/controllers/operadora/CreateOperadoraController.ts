import { Request, Response } from "express";
import { CreateOperadoraService } from "../../services/operadora/CreateOperadoraService";

class CreateOperadoraController {
  async handle(req: Request, res: Response) {
    try {
      const data = req.body;

      const createOperadoraService = new CreateOperadoraService();

      const operadora = await createOperadoraService.execute(data);

      return res.status(201).json(operadora);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });

      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export { CreateOperadoraController };
