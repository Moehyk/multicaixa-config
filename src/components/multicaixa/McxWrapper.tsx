export default function McxWrapper({ children }: React.PropsWithChildren) {
  return (
    <div className="bg-brand-500 h-[820px]">
      <div className="h-full flex flex-col">{children}</div>
    </div>
  );
}
