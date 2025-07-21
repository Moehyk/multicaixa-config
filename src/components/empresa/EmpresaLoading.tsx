"use client";

import { Toolbar } from "../header";
import { Loader } from "@mantine/core";

export default function EmpresaLoading() {
  return (
    <Toolbar>
      <div className="flex items-center justify-center w-full">
        <Loader height={36} radius="xl" type="dots" />
      </div>
    </Toolbar>
  );
}
