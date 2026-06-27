import { Request, Response, NextFunction } from "express";
import UpdateFuncaoService from "../../services/funcao/UpdateFuncaoService";

class UpdateFuncaoController {
  async handle(req: Request, res: Response) {
    try {
      const { idFuncao, status, nome, descricao } = req.body;

      const updateFuncaoService = new UpdateFuncaoService();

      const updateFuncao = await updateFuncaoService.execute(req, res, {
        idFuncao,
        status,
        nome,
        descricao,
      });

      return res.status(200).json(updateFuncao);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateFuncaoController };
