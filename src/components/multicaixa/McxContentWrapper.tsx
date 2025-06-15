export default function McxContentWrapper({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="px-16 py-8 flex items-center justify-center">
      {children}
    </div>
  );
}
