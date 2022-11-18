import prisma from "../Database/prisma";
import { IRegister, UserType } from "../Types/UserTypes";

export async function createUser(body: IRegister) {
  //   await prisma.users.create({ data: body });
}

export async function verifyUsernameAvailability(
  username: string
): Promise<UserType> {
  return await prisma.users.findFirst({
    where: {
      username,
    },
  });
}
