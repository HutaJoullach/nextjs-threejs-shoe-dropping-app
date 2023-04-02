import type { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { filterUserForClient } from "~/server/helpers/filter-user-for-client";
import type { Object } from "@prisma/client";

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 3 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

const addUserDataToObjects = async (objects: Object[]) => {
  const userId = objects.map((object) => object.authorId);
  const users = (
    await clerkClient.users.getUserList({
      userId: userId,
      limit: 110,
    })
  ).map(filterUserForClient);

  return objects.map((object) => {
    const author = users.find((user) => user.id === object.authorId);

    if (!author) {
      console.error("AUTHOR NOT FOUND", object);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Author for object not found. OJECTS ID: ${object.id}, USER ID: ${object.authorId}`,
      });
    }
    if (!author.username) {
      // use the ExternalUsername
      if (!author.externalUsername) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Author has no GitHub Account: ${author.id}`,
        });
      }
      author.username = author.externalUsername;
    }
    return {
      object,
      author: {
        ...author,
        username: author.username ?? "(username not found)",
      },
    };
  });
};

export const objectsRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const object = await ctx.prisma.object.findUnique({
        where: { id: input.id },
      });

      if (!object) throw new TRPCError({ code: "NOT_FOUND" });

      return (await addUserDataToObjects([object]))[0];
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const objects = await ctx.prisma.object.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
    return addUserDataToObjects(objects);
  }),

  getObjectsByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.prisma.object
        .findMany({
          where: {
            authorId: input.userId,
          },
          take: 100,
          orderBy: [{ createdAt: "desc" }],
        })
        .then(addUserDataToObjects)
    ),

  create: privateProcedure
    .input(
      z.object({
        objectType: z.string().min(1).max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const { success } = await ratelimit.limit(authorId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const object = await ctx.prisma.object.create({
        data: {
          authorId,
          objectType: input.objectType,
        },
      });

      return object;
    }),
});
