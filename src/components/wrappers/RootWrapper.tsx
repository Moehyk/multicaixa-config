import bg_image from "../../../public/bg.jpg";

export default function RootWrapper({ children }: React.PropsWithChildren) {
  return (
    <div
      className="flex flex-col flex-1"
      style={{
        backgroundImage: `url(${bg_image.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        backgroundSize: "100% 400px",
      }}
    >
      <div className="flex flex-col-fluid flex-row ">
        <div className="flex-row-fluid relative flex min-h-dvh flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
