import { useState } from "react";
import { motion } from "motion/react";
import { useDisclosure } from "@mantine/hooks";

import { IconChevronDown, IconX } from "@tabler/icons-react";

const MotionIcon = motion.create(IconX, {
  forwardMotionProps: true,
});

export const useMotionIcon = () => {
  const [openedIcon, setOpenedIcon] = useState(false);
  const [opened, { toggle }] = useDisclosure(true);

  const motionIcon = () => {
    toggle();
    setOpenedIcon((state) => !state);
  };

  return { MotionIcon, openedIcon, opened, motionIcon };
};
