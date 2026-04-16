import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório"),

  password: yup
    .string()
    .min(8, "Senha muito curta")
    .required("Senha é obrigatória"),
});
