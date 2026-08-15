import { NextResponse } from "next/server";
import { adherentSchema } from "@/lib/validations/adherer";

// Phase 1: validates and acknowledges. Phase 2 inserts into the
// `membership_applications` Supabase table and sends a Resend notification
// once the project exists.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = adherentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Formulaire invalide." }, { status: 400 });
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
