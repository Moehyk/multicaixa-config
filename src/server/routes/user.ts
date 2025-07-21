import { cache } from "react";
import { db } from "..";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { validateUser, processErrors } from "@/utils/errors";

export const user = {
  get: cache(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    try {
      if (!user)
        throw new Error("Não autorizado", { cause: "erro de autenticação" });

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

      return { data, status: 200 };
    } catch (error) {
      if (error instanceof Error) {
        const response = processErrors(error, {
          noId: !!user.id,
          user: user,
        });

        return response!;
      } else {
        console.error("Unknown Error Type:", error);
      }
      return {
        status: 500,
        message: "Ocorreu um erro ao processar sua solicitação",
        error,
      };
    }
  }),
};
