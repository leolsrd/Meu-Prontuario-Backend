import prismaClient from "../../prisma";
import {compare} from "bcryptjs";
import Jwt from "jsonwebtoken";

interface AuthFuncionarioServiceProps {
  login: string,
  senha: string,
}

class AuthFuncionarioService {
  async execute({ login, senha }: AuthFuncionarioServiceProps) {
    const { sign } = Jwt;

    const funcionarioExists = await prismaClient.funcionario.findFirst({
      where: {
        login: login
      }
    })

    if(!funcionarioExists) {
      throw new Error("Funcionario ou senha incorretos");
    }

    const passwordMatch = await compare(senha, funcionarioExists.senha);

    if(!passwordMatch) {
      throw new Error("Funcionario ou senha incorretos");
    }

    // * Gerar se a senha está correta
    const token = sign({
      nome: funcionarioExists.nome,
      login: funcionarioExists.login
    }, process.env.JWT_SECRET as string, {
      subject: funcionarioExists.idFuncionario,
      expiresIn: "30d"
    })

    return {
      id: funcionarioExists.idFuncionario,
      name: funcionarioExists.nome,
      email: funcionarioExists.login,
      funcao : funcionarioExists.idFuncao,
      token: token
    }
  }
}

export {AuthFuncionarioService};
