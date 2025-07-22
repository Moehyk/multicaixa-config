import { getEmpresa } from "@/server/services";

import EmpresaName from "./EmpresaName";
import Link from "next/link";
import { Toolbar } from "../header";
import { Button } from "@mantine/core";
import { IconDeviceDesktop } from "@tabler/icons-react";

export default async function EmpresaToolbar() {
  const { data } = await getEmpresa();

  if (!data) {
    return null;
  }

  return (
    <Toolbar>
      <EmpresaName name={data.nome} />
      <Button
        component={Link}
        href="/multicaixa/mcx"
        scroll={false}
        rightSection={<IconDeviceDesktop size={20} />}
      >
        Multicaixa
      </Button>
    </Toolbar>
  );
}
