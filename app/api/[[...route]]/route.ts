import { Hono } from "hono";
import { handle } from "hono/vercel";

import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get(
  "/hello/:test",
  zValidator("param", z.object({ test: z.string() })),
  async (ctx) => {
    const { test } = ctx.req.valid("param");
    return ctx.json({
      message: "Hello Next.js!",
      test,
    });
  }
);

export const GET = handle(app);
export const POST = handle(app);
