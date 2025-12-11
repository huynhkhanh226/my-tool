// app/api/user/route.ts
import { UserFormSchema } from "@/components/schemas/user.schema";

export async function POST(req: Request) {
  const raw = await req.json();

  const parsed = UserFormSchema.safeParse(raw); // <-- SERVER VALIDATION

  if (!parsed.success) {
    return Response.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  // Nếu thành công → dùng parsed.data (đã clean, đúng type)
  const data = parsed.data;

  return Response.json({ success: true, data });
}
