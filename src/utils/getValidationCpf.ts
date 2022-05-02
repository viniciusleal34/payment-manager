import { cpf } from "cpf-cnpj-validator";

export function getValidationCpf(cpfField: string): string {
  const regexCpfRaw = /[^a-z0-9]/gi;
  console.log(cpfField);
  const CPFValidation = cpfField.replace(regexCpfRaw, "");
  if (cpf.isValid(CPFValidation)) {
    return CPFValidation;
  } else {
    return "0";
  }
}

export function getMaskCpf(cpfField: string): string {
  return cpfField.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
}
