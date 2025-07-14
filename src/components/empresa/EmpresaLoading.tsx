import EmpresaCard from "./EmpresaCard";
import { Card, Skeleton, Loader } from "@mantine/core";

export default function EmpresaLoading() {
  return (
    <div className="flex items-center justify-center w-full">
      <Loader height={36} radius="xl" type="dots" />
    </div>
  );
}
