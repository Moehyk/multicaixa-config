import { Alert } from "@mantine/core";
import { IconTrash, IconForbidFilled } from "@tabler/icons-react";

export default function MaxItemsAlert({ max }: { max: number }) {
  const maxAlertIcon = <IconForbidFilled size={16} />;

  return (
    <Alert
      color="red"
      title={`Máximo de ${max} items`}
      icon={maxAlertIcon}
      styles={{ root: { paddingBlock: 8 }, icon: { marginRight: 4 } }}
    />
  );
}
