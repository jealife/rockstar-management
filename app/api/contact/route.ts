import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";

// Phase 1: validates and acknowledges. Phase 2 inserts into the
// `contact_messages` Supabase table and sends a Resend notification once
// the project exists and CONTACT_NOTIFICATION_EMAIL is set.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Formulaire invalide." }, { status: 400 });
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
