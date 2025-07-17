import { createFormContext } from "@mantine/form";

import type { ProdutoPagamentoForm } from "@/types";

export const [PagamentoFormProvider, usePagamentoFormContext, usePagForm] =
  createFormContext<ProdutoPagamentoForm>();
