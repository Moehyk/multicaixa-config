import { Card } from "@mantine/core";
import React from "react";

export default function FormCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Card withBorder p={32}>
      <h2 className="text-xl font-semibold mb-8">{title}</h2>
      {children}
    </Card>
  );
}
