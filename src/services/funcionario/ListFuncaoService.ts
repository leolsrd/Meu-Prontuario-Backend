import {Request, Response} from 'express';
import prisma from '../../prisma';

class ListFuncaoService {
  async execute() {
    const funcoes = await prisma.funcao.findMany();
    return funcoes;
  }
}

export { ListFuncaoService };
