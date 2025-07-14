export default function Toolbar({ children }: React.PropsWithChildren) {
  return (
    <div className="fixed left-0 right-0 top-24 z-50 h-16 flex items-center bg-brand-800 ">
      <div className="container w-full flex items-center justify-between">
        <div className="w-full flex items-center justify-between">
          {children}
        </div>
      </div>
    </div>
  );
}
