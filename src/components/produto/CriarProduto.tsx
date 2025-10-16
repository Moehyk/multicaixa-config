"use client";

import { notFound } from "next/navigation";
import { mcxEmpresaStore } from "@/context/mcx";

import { FormCard } from "../forms";
import CreatePagamento from "./CreatePagamento";
import CreateCarregamento from "./CreateCarregamento";
import CreateRecargas from "./CreateRecargas";
import { Tabs } from "@mantine/core";

import styles from "./tabs.module.css";

export default function CriarProdutoForm({ id }: { id: string }) {
  const { getServico } = mcxEmpresaStore();

  const servico = getServico(id);

  if (!servico) {
    notFound();
  }

  return (
    <FormCard header={servico.desigEcra} subheader="Criar Produto">
      <Tabs defaultValue="pagamento" variant="pills">
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
    </FormCard>
  );
}
