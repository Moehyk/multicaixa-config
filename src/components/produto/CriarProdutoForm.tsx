"use client";

import { Card, TextInput, Button, Tabs } from "@mantine/core";

export default function CriarProdutoForm({ id }: { id: string }) {
  return (
    <Card withBorder>
      <h2>Criar Produto</h2>
      <TextInput label="Descrição" placeholder="Descrição do produto" />
      <TextInput label="Descrição" placeholder="Descrição do produto" />
    </Card>
  );
}
