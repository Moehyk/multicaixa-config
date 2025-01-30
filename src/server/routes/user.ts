import { cache } from "react";
import { db } from "..";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const user = {
  create: async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user?.email) throw new Error("UNAUTHORIZED");

    const dbUser = await db.utilizador.upsert({
      where: {
        id: user.id,
      },
      create: {
        id: user.id,
        email: user.email,
        name: user.given_name,
        picture: user.picture,
        surname: user.family_name,
      },
      update: {
        id: user.id,
        email: user.email,
        name: user.given_name,
        picture: user.picture,
        surname: user.family_name,
      },
    });

    return dbUser;
  },
};
