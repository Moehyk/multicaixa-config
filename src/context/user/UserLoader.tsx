import { getUser } from "@/server/services";
import UserStoreInit from "./UserStoreInit";

export default async function UserDataBoundary({
  children,
}: React.PropsWithChildren) {
  const { data } = await getUser();

  if (!data) {
    return null;
  }

  return (
    <>
      <UserStoreInit {...data} />
      {children}
    </>
  );
}
