import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const objectsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const objects = await ctx.prisma.object.findMany({
      take: 100,
    });
    const users = await clerkClient.users.getUserList({
      userId: objects.map((object) => object.authorId),
      limit: 100,
    });
    console.log(users);
    return objects;
  }),
});
