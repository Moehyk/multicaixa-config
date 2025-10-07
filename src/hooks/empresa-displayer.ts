import { useRef } from "react";
import { mcxDataStore } from "@/context/mcx";
import { openContextModal } from "@mantine/modals";
import { useIntersection } from "@mantine/hooks";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export const useEmpresaDisplayer = () => {
  const { user } = useKindeBrowserClient();
  const { nome } = mcxDataStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.025,
  });

  const openModal = () =>
    openContextModal({
      modal: "mcx-modal",
      size: 1200,
      innerProps: {
        type: "DATA",
      },
    });

  return {
    isIntercepted: entry?.isIntersecting,
    nome,
    openModal,
    ref,
    userFirstName: user?.given_name,
    userLastName: user?.family_name,
    userPicture: user?.picture,
  };
};
