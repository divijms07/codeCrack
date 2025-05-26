import {mutation, query} from "./_generated/server";
import {v} from "convex/values";


export const getAllInterviews = query({
  handler: async(ctx) => {
    const identity = ctx.auth.getUserIdentity();
    if(!identity) {
      throw new Error("User Unauthorized");
    }

    const interviews = await ctx.db.query("interviews").collect();

    return interviews;
  }
});

export const getMyInterviews = query({
  handler: async(ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if(!identity) {
      throw new Error("User Unauthorized");
    }
    const interviews = await ctx.db
      .query("interviews")
      .withIndex("by_CandidateId", (q) => q.eq("candidateId",identity.subject))
      .collect();
    
      return interviews!;
  }
});

export const getInterviewsByStreamCallId = query({
  args:{
    streamCallId: v.string(),
  },
  handler: async(ctx, args) => {
    const interviews = await ctx.db
      .query("interviews")
      .withIndex("by_StreamCallId", (q) => q.eq("streamCallId", args.streamCallId))
      .first();
    return interviews;
  }
});

export const createInterview = mutation({
  args:{
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    status: v.string(),
    streamCallId: v.string(),
    candidateId: v.string(),
    interviewerIds: v.array(v.string())
  },
  handler: async(ctx, args) => {
    const identity = ctx.auth.getUserIdentity();
    if(!identity) {
      throw new Error("User Unauthorized");
    }

    const interview = await ctx.db.insert("interviews", {
      ...args,
    });
  },
});

//check status of interview
export const updateInterviewStatus = mutation({
  args:{
    interviewId: v.id("interviews"),
    status: v.string(),
  },
  handler:async(ctx, args) => {
    return await ctx.db.patch(args.interviewId,{
      status: args.status,
      ...(args.status === "completed" ? {endTime: Date.now()} : {}),
    })
  }
});

