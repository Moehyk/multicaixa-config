"use client";

import { useRef, RefObject, useEffect } from "react";
import { mcxDataStore } from "@/context/mcx";
import { openContextModal } from "@mantine/modals";
import { useHeadroom, useIntersection, useInViewport } from "@mantine/hooks";
import { motion } from "motion/react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import Link from "next/link";
import Image from "next/image";
import { Button, ActionIcon, Divider, Avatar, Tooltip } from "@mantine/core";
import { IconEdit, IconDeviceDesktop, IconLogout } from "@tabler/icons-react";

import logo from "@/assets/logo_light.svg";

import type { MaybeNotString } from "@/types";

function EmpresaToolbar({
  empresaName,
  isVisible,
  ref,
  userFirstName,
  userLastName,
  userPicture,
}: {
  empresaName: string;
  isVisible: boolean | undefined;
  ref: (element: any) => void;
  userFirstName: MaybeNotString;
  userLastName: MaybeNotString;
  userPicture: MaybeNotString;
}) {
  return (
    <motion.div
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      ref={ref}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-20 w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)] lg:w-[calc(100vw-4rem)] max-w-6xl  "
    >
      <div className="flex items-center justify-between bg-paper/80 py-2 px-4 rounded-full border border-border backdrop-blur-lg drop-shadow-md">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <Divider orientation="vertical" mx={16} my={6} />
          <h2 className="text-xl font-semibold">{empresaName}</h2>
          <div className="flex gap-2 pl-6">
            <Tooltip label="Editar Empresa" position="top">
              <ActionIcon
                variant="default"
                radius={999}
                component={Link}
                href="/multicaixa/empresa"
              >
                <IconEdit size={20} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Multicaixa" position="top">
              <ActionIcon
                variant="default"
                color="red"
                radius={999}
                onClick={() =>
                  openContextModal({
                    modal: "mcx-modal",
                    size: 1200,
                    innerProps: {
                      type: "DATA",
                    },
                  })
                }
              >
                <IconDeviceDesktop size={20} />
              </ActionIcon>
            </Tooltip>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar src={userPicture} alt="Avatar" size="sm" radius="xl" />
            <span className="text-sm">
              <span>Bem vindo&#44;&nbsp;</span>
              <span className="font-semibold">{`${userFirstName} ${userLastName}`}</span>
            </span>
          </div>
          <Tooltip label="Sair" position="top" color="red">
            <ActionIcon color="red" radius={999}>
              <IconLogout size={20} />
            </ActionIcon>
          </Tooltip>
        </div>
      </div>
    </motion.div>
  );
}

export default function EmpresaDisplayer() {
  const { nome } = mcxDataStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.025,
  });
  const { user } = useKindeBrowserClient();

  return (
    <>
      <div ref={ref} className="mb-16">
        <h2 className="text-4xl font-semibold mb-4">{nome}</h2>
        <div className="flex gap-4">
          <Button
            size="md"
            variant="default"
            component={Link}
            href="/multicaixa/empresa"
            color="black"
            rightSection={<IconEdit size={20} />}
          >
            Editar Empresa
          </Button>
          <Button
            size="md"
            variant="default"
            onClick={() =>
              openContextModal({
                modal: "mcx-modal",
                size: 1200,
                innerProps: {
                  type: "DATA",
                },
              })
            }
            rightSection={<IconDeviceDesktop size={20} />}
          >
            Multicaixa
          </Button>
        </div>
        <EmpresaToolbar
          empresaName={nome}
          isVisible={!entry?.isIntersecting}
          ref={ref}
          userFirstName={user?.given_name}
          userLastName={user?.family_name}
          userPicture={user?.picture}
        />
      </div>
    </>
  );
}
