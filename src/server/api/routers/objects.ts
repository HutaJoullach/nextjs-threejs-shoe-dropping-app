import type { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};

export const objectsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const objects = await ctx.prisma.object.findMany({
      take: 100,
    });
    const users = (
      await clerkClient.users.getUserList({
        userId: objects.map((object) => object.authorId),
        limit: 100,
      })
    ).map(filterUserForClient);
    // console.log(users);

    return objects.map((object) => ({
      object,
      author: users.find((user) => user.id === object.authorId),
    }));
  }),
});
