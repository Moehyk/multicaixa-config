"use client";

import React from "react";
import { Card } from "@mantine/core";

export default function GridProduto({ title }: { title: string }) {
  return (
    <Card withBorder className="gap-2">
      {title}
    </Card>
  );
}
