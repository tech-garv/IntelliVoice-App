import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    topic: v.string(),
    expertName: v.string(),
    coachingOption: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("DiscussionRoom", {
      topic: args.topic,
      expertName: args.expertName,
      coachingOption: args.coachingOption,
    });
    return id;
  },
});

export const GetDiscussionRoom = query({
  args: {
    id: v.id("DiscussionRoom"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
