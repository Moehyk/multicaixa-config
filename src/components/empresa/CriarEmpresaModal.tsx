"use client";

import React from "react";

import EmpresaModalForm from "./EmpresaModalForm";
import { Modal } from "@mantine/core";

export default function CriarEmpresaModal() {
  return (
    <Modal
      opened={true}
      withCloseButton={false}
      title="Criar Empresa"
      size="xl"
      onClose={() => {}}
    >
      <EmpresaModalForm />
    </Modal>
  );
}
