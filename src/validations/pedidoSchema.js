import * as yup from "yup";

export const pedidoSchema = yup.object().shape({
  titulo: yup
    .string()
    .trim()
    .min(3, "Título muito curto")
    .max(80, "Título muito longo")
    .required("Título obrigatório"),

  descricao: yup
    .string()
    .trim()
    .min(5, "Descrição muito curta")
    .max(300, "Descrição muito longa")
    .required("Descrição obrigatória"),

  peso_kg: yup
    .number()
    .typeError("Peso inválido")
    .positive("O peso deve ser maior que 0")
    .min(0.1, "Peso mínimo 0.1 kg")
    .max(100, "Peso máximo 100 kg")
    .required("Peso obrigatório"),

  urgencia: yup
    .string()
    .oneOf(["NORMAL", "URGENTE", "EXPRESS"], "Urgência inválida")
    .default("NORMAL")
    .nullable(),

  origem: yup
    .string()
    .trim()
    .min(3, "Origem inválida")
    .required("Origem obrigatória"),

  destino: yup
    .string()
    .trim()
    .min(3, "Destino inválido")
    .required("Destino obrigatório"),

  valor_sugerido: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .nullable()
    .min(0, "Valor inválido"),
});
