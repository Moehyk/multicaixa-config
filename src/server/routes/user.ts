import { cache } from "react";
import { db } from "..";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export const user = {
  get: cache(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    try {
      const data = await db.utilizador.upsert({
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
      revalidatePath("/multicaixa", "page");
      return { data, status: 200 };
    } catch (error) {
      return { status: 400, message: "Autorização negada.", error };
    }
  }),
};
