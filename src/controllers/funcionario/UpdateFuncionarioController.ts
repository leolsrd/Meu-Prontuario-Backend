import { Request, Response } from 'express';
import { UpdateFuncionarioService } from '../../services/funcionario/UpdateFuncionarioService';

class UpdateFuncionarioController {
  async handle(req: Request, res: Response) {

    const data = req.body;

    const updateFuncionarioService = new UpdateFuncionarioService();

    const funcionario = await updateFuncionarioService.execute({
      idFuncionario: data.idFuncionario,
      login: data.login,
      nome: data.nome,
      idFuncao: data.idFuncao,
      status: data.status,
      cpfCnpj: data.cpfCnpj,
      senha: data.senha,
      telefone: data.telefone,
      dataNascimento: data.dataNascimento,
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: data.complemento,
      numero: data.numero,
      bairro: data.bairro,
      cidade: data.cidade,
      uf: data.uf
    });

    return res.status(200).json(funcionario);

  }
}

export { UpdateFuncionarioController }
