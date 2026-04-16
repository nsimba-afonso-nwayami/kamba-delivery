import * as yup from "yup";

export const usuariosSchema = yup.object({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome muito curto"),

  email: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório"),

  telefone: yup
    .string()
    .required("Telefone é obrigatório")
    .min(9, "Telefone inválido"),

  tipo: yup
    .string()
    .required("Selecione o tipo de usuário"),

  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "Mínimo 8 caracteres"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("Confirme a senha"),
});
