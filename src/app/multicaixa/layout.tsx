export default function MulticaixaLayout({
  children,
  mcxmodal,
}: {
  children: React.ReactNode;
  mcxmodal: React.ReactNode;
}) {
  return (
    <>
      <div className="mt-16">{children}</div>
      {mcxmodal}
    </>
  );
}
