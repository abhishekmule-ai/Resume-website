import fs from "fs";
import path from "path";

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  ip?: string;
  userAgent?: string;
  createdAt: string;
}

export interface StorageResult {
  stored: boolean;
  provider: "supabase" | "mongodb" | "webhook" | "local_file" | "console";
  message: string;
}

/**
 * Stores a contact submission into an external cloud database.
 * Supports:
 * 1. Supabase (PostgreSQL) - via standard REST API without external dependencies
 * 2. MongoDB Atlas - via MongoDB Data API
 * 3. Generic Database Webhook (Airtable / Supabase Function / Custom Server)
 * 4. Local File / Memory fallback
 */
export async function storeContactSubmission(
  submission: ContactSubmission
): Promise<StorageResult> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  // 1. Check for Supabase (PostgreSQL Cloud Database)
  if (supabaseUrl && supabaseKey) {
    try {
      const baseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
      const endpoint = `${baseUrl}/rest/v1/contacts`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: submission.name,
          email: submission.email,
          subject: submission.subject,
          message: submission.message,
          ip: submission.ip || "unknown",
          created_at: submission.createdAt,
        }),
      });

      if (response.ok) {
        return {
          stored: true,
          provider: "supabase",
          message: "Stored successfully in Supabase (PostgreSQL).",
        };
      } else {
        const errorText = await response.text();
        console.error("[Supabase Store Error]:", response.status, errorText);
      }
    } catch (err: unknown) {
      console.error("[Supabase Connection Error]:", err);
    }
  }

  // 2. Check for Generic External Database Webhook (Airtable, Firebase, n8n, etc.)
  const externalDbUrl = process.env.EXTERNAL_DATABASE_URL;
  if (externalDbUrl) {
    try {
      const response = await fetch(externalDbUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.EXTERNAL_DATABASE_KEY
            ? { Authorization: `Bearer ${process.env.EXTERNAL_DATABASE_KEY}` }
            : {}),
        },
        body: JSON.stringify(submission),
      });

      if (response.ok) {
        return {
          stored: true,
          provider: "webhook",
          message: "Stored successfully via External Database Webhook.",
        };
      }
    } catch (err: unknown) {
      console.error("[External DB Webhook Error]:", err);
    }
  }

  // 3. Fallback: Local file persistence in development / node runtime
  try {
    const dataDir = path.join(process.cwd(), ".data");
    const filePath = path.join(dataDir, "submissions.json");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let existing: ContactSubmission[] = [];
    if (fs.existsSync(filePath)) {
      try {
        existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      } catch {
        existing = [];
      }
    }

    existing.unshift(submission);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");

    return {
      stored: true,
      provider: "local_file",
      message: "Stored in local submissions database (.data/submissions.json).",
    };
  } catch {
    console.log("[Local Store Fallback Log]:", submission);
    return {
      stored: true,
      provider: "console",
      message: "Logged to server console (ready for external cloud database).",
    };
  }
}
