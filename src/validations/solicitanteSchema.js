import * as yup from "yup";

const FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const solicitanteSchema = yup.object({
  morada: yup
    .string()
    .required("Morada é obrigatória")
    .min(5, "Morada muito curta"),

  foto_rosto: yup
    .mixed()
    .required("Foto do rosto é obrigatória")
    .test("fileType", "Apenas JPG, JPEG ou PNG", (value) =>
      value ? FILE_TYPES.includes(value.type) : false
    ),

  doc_frente: yup
    .mixed()
    .required("Documento frente é obrigatório")
    .test("fileType", "Apenas JPG, JPEG ou PNG", (value) =>
      value ? FILE_TYPES.includes(value.type) : false
    ),

  doc_verso: yup
    .mixed()
    .required("Documento verso é obrigatório")
    .test("fileType", "Apenas JPG, JPEG ou PNG", (value) =>
      value ? FILE_TYPES.includes(value.type) : false
    ),
});
