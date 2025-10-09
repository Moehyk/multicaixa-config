"use client";

import { Paper, ActionIcon } from "@mantine/core";

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
    <Paper withBorder>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">{titleSection}</div>
        <ActionIcon.Group>{actionsSection}</ActionIcon.Group>
      </div>
      {collapseSection}
    </Paper>
  );
}
