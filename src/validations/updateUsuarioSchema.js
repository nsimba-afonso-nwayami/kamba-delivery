// validations/updateUsuarioSchema.js
import * as yup from "yup";

export const updateUsuarioSchema = yup.object({
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
});
