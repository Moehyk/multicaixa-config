import { useState } from "react";
import { motion } from "motion/react";
import { useDisclosure } from "@mantine/hooks";

import { IconChevronDown } from "@tabler/icons-react";

const MotionIcon = motion.create(IconChevronDown, {
  forwardMotionProps: true,
});

export const useMotionIcon = () => {
  const [openedIcon, setOpenedIcon] = useState(false);
  const [opened, { toggle }] = useDisclosure(false);

  const motionIcon = () => {
    toggle();
    setOpenedIcon((state) => !state);
  };

  return { MotionIcon, openedIcon, opened, motionIcon };
};
