import { Divider, Paper } from "@mantine/core";

export default function FormCardHeader({
  children,
  header,
  subheader,
}: {
  children: React.ReactNode;
  header: string;
  subheader?: string;
}) {
  return (
    <Paper p={32} withBorder>
      <div className="flex items-center gap-4 mb-12">
        <span className="text-2xl font-semibold">{header}</span>
        {subheader && (
          <>
            <Divider orientation="vertical" />
            <span className="text-lg font-medium">{subheader}</span>
          </>
        )}
      </div>
      {children}
    </Paper>
  );
}
