// app/api/user/me/route.ts
import { NextResponse } from "next/server";
export async function POST() {
  try {
    return NextResponse.json(
      {
        user: "khanh",
      },
      { status: 200 },
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
