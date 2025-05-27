import { notifications } from "@mantine/notifications";

type Result = {
  status: number;
  message: string;
};

export const sucessNotification = (result: Result) =>
  notifications.show({
    title: "Sucesso!",
    message: result.message,
    autoClose: 4000,
    color: "green",
  });

export const errorNotification = (result: Result) =>
  notifications.show({
    title: "Erro!",
    message: result.message,
    autoClose: 4000,
    color: "red",
  });
