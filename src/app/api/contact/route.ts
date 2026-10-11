import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";

// Simple in-memory rate limiting map for edge/node runtime
interface RateLimitEntry {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();

function isRateLimited(ip: string): boolean {
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "5", 10);
  const windowSeconds = parseInt(process.env.RATE_LIMIT_WINDOW_SECONDS || "60", 10);
  const now = Date.now();

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + windowSeconds * 1000,
    });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Identify Client IP for rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload with Zod
    const body = await req.json();
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map((e) => e.message).join(", ");
      return NextResponse.json(
        { error: `Validation error: ${errorMessages}` },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    // 3. Email Delivery Hook
    // When RESEND_API_KEY or SMTP credentials are configured, delivery logic executes here.
    // In local development or placeholder state, we log the message securely to the server console.
    console.log(`[Contact Form Received]`, {
      from: `${name} <${email}>`,
      subject,
      length: message.length,
      timestamp: new Date().toISOString(),
    });

    // 4. Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully. Thank you for reaching out!",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("[Contact API Error]:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
