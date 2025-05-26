/*import {httpRouter} from "convex/server";
import {httpAction} from "./_generated/server"; 
import {WebhookEvent} from "@clerk/nextjs/server"
import {Webhook} from "svix"; 
import {api} from "./_generated/api";
const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx,req) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Webhook secret is not set in environment variables.");
    }

    const svix_id = req.headers.get("svix-id");
    const svix_signature = req.headers.get("svix-signature");
    const svix_timestamp = req.headers.get("svix-timestamp");

    if(!svix_id || !svix_signature || !svix_timestamp) {
      throw new Error("Missing required headers.");
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let event: WebhookEvent;

    try {
      event = wh.verify(body,{
        "svix_id": svix_id,
        "svix_signature": svix_signature,
        "svix_timestamp": svix_timestamp,
      }) as WebhookEvent;
    } catch (error) {
      console.error("Error verifying webhook:", error);
      return new Response("Invalid webhook signature", { status: 401 });
    }

    const eventType = event.type;

    if(eventType === "user.created") {
      const {id,email_addresses,first_name,last_name,image_url} = event.data;
      //primary email
      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try{
        await ctx.runMutation(api.users.syncUser,{
          clerkId: id,
          email,
          name,
          image: image_url,
        })
      } catch (error) {
        console.error("Error creatting user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }
    return new Response("Webhook received", { status: 200 });
  })
})

export default http;*/

import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Webhook secret is not set in environment variables.");
    }

    const svix_id = req.headers.get("svix-id");
    const svix_signature = req.headers.get("svix-signature");
    const svix_timestamp = req.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      throw new Error("Missing required headers.");
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);

    type UserCreatedEvent = WebhookEvent & {
      type: "user.created";
      data: {
        id: string;
        email_addresses: { email_address: string }[];
        first_name: string;
        last_name: string;
        image_url: string;
      };
    };

    let event: UserCreatedEvent;

    try {
      event = wh.verify(body, {
        "svix-id": svix_id,
        "svix-signature": svix_signature,
        "svix-timestamp": svix_timestamp,
      }) as UserCreatedEvent;
    } catch (error) {
      console.error("Error verifying webhook:", error);
      return new Response("Invalid webhook signature", { status: 401 });
    }

    const eventType = event.type;

    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } = event.data;
      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.syncUser, {
          clerkId: id,
          email,
          name,
          image: image_url,
        });
      } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    return new Response("Webhook received", { status: 200 });
  }),
});

export default http;


