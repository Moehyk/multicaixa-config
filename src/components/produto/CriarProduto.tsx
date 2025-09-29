"use client";

import { useState } from "react";

import { ProdutoFormCardHeader } from "@/components/forms";
import CreatePagamento from "./CreatePagamento";
import CreateCarregamento from "./CreateCarregamento";
import CreateRecargas from "./CreateRecargas";
import { Tabs } from "@mantine/core";

import type { ProdutoTipo } from "@prisma/client";

import styles from "./tabs.module.css";

export default function CriarProdutoForm({
  id,
  ...props
}: {
  id: string;
  header: string;
  subheader: string;
}) {
  const [produtoTipo, setProdutoTipo] = useState<ProdutoTipo>("pagamento");

  return (
    <>
      <ProdutoFormCardHeader {...props} type={produtoTipo} />
      <Tabs
        value={produtoTipo}
        onChange={(v) => setProdutoTipo(v as ProdutoTipo)}
        variant="pills"
      >
        <Tabs.List grow>
          <Tabs.Tab value="pagamento" className={styles.tabs}>
            Pagamento
          </Tabs.Tab>
          <Tabs.Tab value="carregamentos" className={styles.tabs}>
            Carregamentos
          </Tabs.Tab>
          <Tabs.Tab value="recargas" className={styles.tabs}>
            Recargas
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="pagamento">
          <CreatePagamento servicoId={id} />
        </Tabs.Panel>
        <Tabs.Panel value="carregamentos">
          <CreateCarregamento servicoId={id} />
        </Tabs.Panel>
        <Tabs.Panel value="recargas">
          <CreateRecargas servicoId={id} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
