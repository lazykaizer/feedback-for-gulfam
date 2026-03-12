import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  reviews: defineTable({
    project_id: v.string(),
    rating: v.number(),
    review_text: v.string(),
    name: v.optional(v.string()),
    image_url: v.optional(v.string()),
    storage_id: v.optional(v.id("_storage")),
    country: v.string(),
    consent_public: v.boolean(),
  }).index("by_project_id", ["project_id"])
    .index("by_consent_public", ["consent_public"]),
  subscribers: defineTable({
    email: v.string(),
  }).index("by_email", ["email"]),
});
