import { Request, Response } from 'express';
import { ListFuncaoService } from '../../services/funcao/ListFuncaoService';

class ListFuncaoController {
  async handle(req: Request, res: Response) {
    const listFuncaoService = new ListFuncaoService();

    const resultFuncoes = await listFuncaoService.execute();

    return res.status(200).json(resultFuncoes);
  }
}

export { ListFuncaoController }
