import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export { db } from "./db";
export const { getUser } = getKindeServerSession();
