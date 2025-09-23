import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  auth_users: defineTable({
    name: v.string(),
   lastName: v.string(),
    email: v.string(),
    password: v.string(),
  }).index("by_email", ["email"]),

  DiscussionRoom: defineTable({
    topic: v.string(),
    expertName: v.string(),
    coachingOption: v.string(),
  }),
  contact_messages: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }),

});
