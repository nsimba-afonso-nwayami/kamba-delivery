import * as yup from "yup";

export const passwordSchema = yup.object({
  current_password: yup
    .string()
    .required("Senha atual é obrigatória"),

  new_password: yup
    .string()
    .min(8, "Mínimo 8 caracteres")
    .required("Nova senha é obrigatória"),

  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "As senhas não coincidem")
    .required("Confirmação obrigatória"),
});
