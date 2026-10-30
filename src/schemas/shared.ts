import { z } from "zod";

export const EstadosBrasileiros = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

// ====================================
// 0. Funções auxiliares
// ====================================
// Algoritmo de validação do CPF
function validarCPF(cpf: string): boolean {
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false; // Elimina números repetidos como "111.111.111-11"

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

// Algoritmo de validação do CNPJ
function validarCNPJ(cnpj: string): boolean {
  if (cnpj.length !== 14 || !!cnpj.match(/(\d)\1{13}/)) return false; // Elimina números repetidos como "00.000.000/0000-00"

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) return false;

  return true;
}

// ====================================
// 1. Funções para criar (POST)
// ====================================

// ====================================
// 2. Funções para atualizar (PUT-PATCH)
// ====================================
export function criarStringOpcionalComNull(
  minLength?: number,
  errorMessage?: string,
) {
  return z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined) return undefined;
      const valorLimpo = val.trim();
      if (valorLimpo === "") return null;
      return valorLimpo;
    })
    .refine(
      (val) => {
        if (val === null || val === undefined) return true;
        if (minLength !== undefined) return val.length >= minLength;
        return true;
      },
      {
        message: errorMessage ?? `Deve ter pelo menos ${minLength} caracteres`,
      },
    );
}

export function criarCodigoOpcionalComNull(
  exactLength: number,
  errorMessage: string,
) {
  return z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined) return undefined;
      const valorLimpo = val.trim();
      if (valorLimpo === "") return null;

      // AQUI ENTRA O REPLACE: Remove tudo o que NÃO for número (letras, pontos, hifens)
      return valorLimpo.replace(/\D/g, "");
    })
    .refine(
      (val) => {
        if (val === null || val === undefined) return true;
        // Valida se o documento final limpo tem o tamanho exato exigido
        return val.length === exactLength;
      },
      { message: errorMessage },
    );
}

export function criarTelefoneOpcionalComNull(errorMessage?: string) {
  return z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined) return undefined;

      const valorLimpo = val.trim();
      if (valorLimpo === "") return null;

      // Remove parênteses, hifens, espaços e letras (mantém apenas números)
      return valorLimpo.replace(/\D/g, "");
    })
    .refine(
      (val) => {
        // Se for null ou undefined, ignora a validação (campo opcional limpo)
        if (val === null || val === undefined) return true;

        // Valida se o telefone tem 10 dígitos (fixo) ou 11 dígitos (celular)
        return val.length === 10 || val.length === 11;
      },
      {
        message:
          errorMessage ??
          "Telefone inválido. Deve conter o DDD e ter 10 (fixo) ou 11 (celular) dígitos.",
      },
    );
}

/**
 * Cria um schema opcional para CPF ou CNPJ combinados no mesmo campo.
 * Remove máscaras e valida a matemática oficial do documento (Dígitos Verificadores).
 */
export function criarCpfCnpjOpcionalComNull(errorMessage?: string) {
  return z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined) return undefined;

      const valorLimpo = val.trim();
      if (valorLimpo === "") return null;

      // Remove pontos, hifens e barras (tudo que não for número)
      return valorLimpo.replace(/\D/g, "");
    })
    .refine(
      (val) => {
        // Se for null ou undefined, a validação é ignorada (campo opcional/limpo)
        if (val === null || val === undefined) return true;

        // Se tem 11 dígitos, aplica a regra matemática do CPF
        if (val.length === 11) {
          return validarCPF(val);
        }

        // Se tem 14 dígitos, aplica a regra matemática do CNPJ
        if (val.length === 14) {
          return validarCNPJ(val);
        }

        // Se não tiver nem 11 nem 14 dígitos, falha direto
        return false;
      },
      {
        message:
          errorMessage ??
          "CPF ou CNPJ inválido (verifique os dígitos digitados)",
      },
    );
}

export function criarEstadoOpcionalComNull(errorMessage?: string) {
  return z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined) return undefined;

      const valorLimpo = val.trim().toUpperCase();
      if (valorLimpo === "") return null;

      return valorLimpo;
    })
    .refine(
      (val) => {
        if (val === null || val === undefined) return true;

        return EstadosBrasileiros.includes(val as any);
      },
      {
        message:
          errorMessage ??
          `Estado inválido. Use uma sigla válida (exemplo: PE, BA, SP)`,
      },
    );
}

export function criarDataNascimentoOpcionalComNull(errorMessage?: string) {
  return z
    .preprocess((val) => {
      if (typeof val === "string") {
        const valorLimpo = val.trim();
        return valorLimpo === "" ? null : valorLimpo;
      }
      return val;
    }, z.string().nullable().optional())

    .superRefine((val, ctx) => {
      if (val === null || val === undefined) return;

      const regexFormato = /^\d{4}-\d{2}-\d{2}$/;
      if (!regexFormato.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Formato inválido. O formato correto é yyyy-mm-dd.",
        });
        return;
      }

      const dataInput = new Date(`${val}T00:00:00`);
      const dataAtual = new Date();
      dataAtual.setHours(0, 0, 0, 0);

      if (isNaN(dataInput.getTime()) || dataInput > dataAtual) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            errorMessage ??
            "A data deve ser válida e não pode estar no futuro.",
        });
      }
    });
}
