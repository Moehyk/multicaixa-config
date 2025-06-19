"use client";

import { Card, ActionIcon } from "@mantine/core";
import React from "react";

export default function GridItem({
  actionsSection,
  collapseSection,
  titleSection,
}: {
  actionsSection?: React.ReactNode;
  collapseSection?: React.ReactNode;
  titleSection: React.ReactNode;
}) {
  return (
    <Card withBorder>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">{titleSection}</div>
        <ActionIcon.Group>{actionsSection}</ActionIcon.Group>
      </div>
      {collapseSection}
    </Card>
  );
}
