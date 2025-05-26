import { defineSchema, defineTable} from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    //candidate,interviewer
    role: v.union(v.literal("candidate"), v.literal("interviewer")),
    //in order to engage convex and clerk authentication
    clerkId: v.string(),
  }).index("by_ClerkId", ["clerkId"]),


  interviews: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    status: v.string(),
    streamCallId: v.string(),
    candidateId: v.string(),
    interviewerIds: v.array(v.string()),
  }).index("by_CandidateId", ["candidateId"])
  .index("by_StreamCallId", ["streamCallId"]),
  
  comments: defineTable({
    content:v.string(),
    rating: v.number(),
    interviewerId: v.string(),
    interviewId: v.id("interviews"),
  }).index("by_InterviewId", ["interviewId"]),  


});