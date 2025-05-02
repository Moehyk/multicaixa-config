import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { empresaSchema } from "@/utils/schemas";
import { EmpresaForm } from "@/types";

export const useEmpresaForm = () =>
  useForm<EmpresaForm>({
    mode: "uncontrolled",
    initialValues: {
      nome: "",
      sigla: "",
      morada: "",
      localidade: "",
      responsavel: "",
      telefone: "",
      email: "",
      cae: "",
      numero_pessoa_colectiva: "",
      logo: "",
      numero_entidade: "",
      desig_ecra: "",
      desig_tecla_seleccao: "",
    },
    validate: zodResolver(empresaSchema),
  });
