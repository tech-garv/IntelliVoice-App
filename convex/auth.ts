import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const createAuthUser = mutation({
  args: {
    name: v.string(),
    lastName: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("auth_users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) throw new Error("User already exists");

    await ctx.db.insert("auth_users", args);
  },
});

export const getAuthUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("auth_users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});
