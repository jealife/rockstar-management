import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations/newsletter";

// Phase 1: validates and acknowledges. Phase 2 inserts into the
// `newsletter_subscribers` Supabase table once the project exists.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  }

  if (parsed.data.company) {
    // Honeypot filled — silently pretend success, don't process.
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
