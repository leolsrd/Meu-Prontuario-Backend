import { Request, Response } from "express";
import UpdateFuncaoService from "../../services/funcao/UpdateFuncaoService";

class UpdateFuncaoController {
  async handle(req: Request, res: Response) {
    try {
      const data = req.body;

      const updateFuncaoService = new UpdateFuncaoService();

      const updateFuncao = await updateFuncaoService.execute(data);

      return res.status(200).json({
        message: "Funcao atualizada com sucesso",
        updateFuncao,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });

      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export { UpdateFuncaoController };
