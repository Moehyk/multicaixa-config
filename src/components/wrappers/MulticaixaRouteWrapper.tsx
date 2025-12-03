function Footer() {
  return <footer className="container w-full py-8">Footer</footer>;
}

export default function MulticaixaRouteWrapper({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="relative  min-h-dvh flex flex-col">
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="container w-full flex flex-col flex-1 mt-32">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
