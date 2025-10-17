"use client";

import { Paper, ActionIcon } from "@mantine/core";

export default function GridItem({
  actionsSection,
  collapseSection,
  titleSection,
  isCollapsed,
}: {
  actionsSection?: React.ReactNode;
  collapseSection?: React.ReactNode;
  isCollapsed?: boolean;
  titleSection: React.ReactNode;
}) {
  return (
    <Paper p={16} withBorder mb={isCollapsed ? 16 : 0}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">{titleSection}</div>
        <ActionIcon.Group>{actionsSection}</ActionIcon.Group>
      </div>
      {collapseSection}
    </Paper>
  );
}
