import { Request, Response } from "express";
import { UpdateOperadoraService } from "../../services/operadora/UpdateOperadoraService";

class UpdateOperadoraController {
  async handle(req: Request, res: Response) {
    try {
      const data = req.body;

      const updateOperadoraService = new UpdateOperadoraService();

      const operadoraUpdate = await updateOperadoraService.execute(data);

      return res.status(200).json({
        message: "Operadora atualizada com sucesso",
        operadoraUpdate,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });

      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export { UpdateOperadoraController };
