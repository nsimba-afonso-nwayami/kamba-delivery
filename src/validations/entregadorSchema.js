import * as yup from "yup";

const FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const entregadorSchema = yup.object({
  matricula_veiculo: yup
  .string()
  .required("Placa é obrigatória")
  .uppercase()
  .test("placa-angola", "Placa inválida, os formatos aceites: LD-12-34-HG | LD1234HG | LD-1234 | LD12-34", (value) => {
    if (!value) return false;

    // remove espaços
    const placa = value.replace(/\s/g, "").toUpperCase();

    // formatos aceites:
    // LD-12-34-HG | LD1234HG | LD-1234 | LD12-34 | etc (flexível)
    const regex =
      /^([A-Z]{2,3})[-]?\d{2}[-]?\d{2}[-]?[A-Z]{0,3}$|^[A-Z]{2,3}\d{4,6}$/;

    return regex.test(placa);
  }),

  foto_rosto: yup
    .mixed()
    .required("Foto do rosto é obrigatória")
    .test("fileType", "Apenas JPG, JPEG ou PNG", (value) =>
      value ? FILE_TYPES.includes(value.type) : false
    ),

  doc_frente: yup
    .mixed()
    .required("BI frente é obrigatório")
    .test("fileType", "Apenas JPG, JPEG ou PNG", (value) =>
      value ? FILE_TYPES.includes(value.type) : false
    ),

  doc_verso: yup
    .mixed()
    .required("BI verso é obrigatório")
    .test("fileType", "Apenas JPG, JPEG ou PNG", (value) =>
      value ? FILE_TYPES.includes(value.type) : false
    ),

  carta_conducao: yup
    .mixed()
    .required("Carta de condução é obrigatória")
    .test("fileType", "Apenas JPG, JPEG ou PNG", (value) =>
      value ? FILE_TYPES.includes(value.type) : false
    ),
});
