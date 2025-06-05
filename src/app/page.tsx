import { Empresa } from "@prisma/client";

const empresa: Empresa = {
  id: "1",
  utilizadorId: "1",
  cae: "567",
  nome: "Empresa",
  numero_pessoa_colectiva: "null",
  sigla: "123",
  morada: "Rua",
  localidade: "null",
  responsavel: "Responsavel",
  telefone: "null",
  email: "empresa@empresa.com",
  numero_entidade: "1",
  desig_ecra: "1234567890",
  desig_tecla_seleccao: "1234567890",
};

import { Anchor } from "@mantine/core";

export default function Home() {
  return <Anchor href="/multicaixa">Multicaixa</Anchor>;
}
