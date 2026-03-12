import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getReviews = query({
  args: {
    projectId: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db
      .query("reviews")
      .withIndex("by_consent_public", (q) => q.eq("consent_public", true))
      .order("desc");

    const reviews = await q.collect();

    // Filter by project_id if provided
    let filtered = args.projectId 
      ? reviews.filter(r => r.project_id === args.projectId)
      : reviews;

    // Apply limit
    if (args.limit) {
      filtered = filtered.slice(0, args.limit);
    }

    // Resolve storage IDs to URLs
    return Promise.all(
      filtered.map(async (review) => ({
        ...review,
        image_url: review.storage_id 
          ? await ctx.storage.getUrl(review.storage_id) 
          : review.image_url,
      }))
    );
  },
});

export const createReview = mutation({
  args: {
    project_id: v.string(),
    rating: v.number(),
    review_text: v.string(),
    name: v.optional(v.string()),
    storage_id: v.optional(v.id("_storage")),
    country: v.string(),
    consent_public: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("reviews", {
      ...args,
    });
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    
    if (existing) {
      return { success: true, message: "Already subscribed" };
    }

    await ctx.db.insert("subscribers", {
      email: args.email,
    });
    return { success: true };
  },
});
