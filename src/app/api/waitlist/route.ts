import { NextRequest, NextResponse } from "next/server";
import { waitlistSchema, normalizeEmail } from "@/lib/validation";
import { getWaitlistCollection, WaitlistDocument } from "@/lib/mongodb";
import { MongoServerError } from "mongodb";

// Max allowed payload size: 10 KB to prevent payload abuse
const MAX_PAYLOAD_SIZE = 10 * 1024;

export async function POST(req: NextRequest) {
  try {
    // 1. Check Content-Type
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid Content-Type. Expected application/json." },
        { status: 415 }
      );
    }

    // 2. Enforce request size limit
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_SIZE) {
      return NextResponse.json(
        { error: "Payload too large. Maximum size is 10 KB." },
        { status: 413 }
      );
    }

    // 3. Parse JSON with safe error handling
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Malformed JSON payload in request body." },
        { status: 400 }
      );
    }

    // 4. Validate input with Zod
    const validationResult = waitlistSchema.safeParse(body);
    if (!validationResult.success) {
      const issue = validationResult.error.issues[0];
      return NextResponse.json(
        {
          error: issue?.message || "Invalid email address format.",
          details: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;
    const emailNormalized = normalizeEmail(email);

    // 5. Connect to MongoDB collection
    const collection = await getWaitlistCollection();

    // 6. Check if email is already registered before attempting insert
    const existing = await collection.findOne({ emailNormalized });
    if (existing) {
      return NextResponse.json(
        {
          error: "You're already on the waitlist! We'll notify you as soon as early access opens.",
          code: "ALREADY_REGISTERED",
        },
        { status: 409 }
      );
    }

    // 7. Insert the waitlist document
    const newEntry: WaitlistDocument = {
      email: email.trim(),
      emailNormalized,
      createdAt: new Date(),
      source: "landing_page",
      status: "active",
    };

    const insertResult = await collection.insertOne(newEntry);

    if (!insertResult.acknowledged) {
      throw new Error("Database write operation was not acknowledged.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "You're on the waitlist! We're thrilled to have you along for the journey.",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Check for MongoDB duplicate key error code 11000 in race conditions
    if (error instanceof MongoServerError && error.code === 11000) {
      return NextResponse.json(
        {
          error: "You're already on the waitlist! We'll notify you as soon as early access opens.",
          code: "ALREADY_REGISTERED",
        },
        { status: 409 }
      );
    }

    // Log the error internally without exposing credentials or internal traces to user
    console.error("Waitlist submission error:", error instanceof Error ? error.message : "Unknown error");

    return NextResponse.json(
      {
        error: "An unexpected error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}

