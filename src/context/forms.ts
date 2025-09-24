"use client";

import { createFormContext } from "@mantine/form";

import type {
  ProdutoPagamentoForm,
  ProdutoRecargasForm,
  ProdutoCarregamentoForm,
} from "@/types";

export const [PagamentoFormProvider, usePagamentoFormContext, usePagForm] =
  createFormContext<ProdutoPagamentoForm>();

export const [RecargasFormProvider, useRecargasFormContext, useRecaForm] =
  createFormContext<ProdutoRecargasForm>();

export const [
  CarregamentoFormProvider,
  useCarregamentoFormContext,
  useCarrForm,
] = createFormContext<ProdutoCarregamentoForm>();
