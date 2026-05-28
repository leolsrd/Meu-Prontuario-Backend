import { Request, Response } from "express";

interface ErrorReturnProps {
  messageConsole: string;
  statusCode: number;
  messageApi: string;
  res: Response;
}

const returnError = ({
  messageConsole,
  statusCode,
  messageApi,
  res,
}: ErrorReturnProps) => {
  if (messageConsole && statusCode && messageApi) {
    const errorStack = new Error(messageConsole);

    console.error("------ Erro Detalhado -----");
    console.error(errorStack.stack);

    res.status(statusCode).json({
      error: messageApi,
    });

    return;
  }
};

export { returnError };
