import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const { getUser } = getKindeServerSession();
export { db } from "./db";
