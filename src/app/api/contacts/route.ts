import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { firstName, lastName, email } = body;
    const owner = await prisma.user.findUnique({ where: { email: session.user.email } });
    const contact = await prisma.contact.create({
      data: { firstName, lastName, email, ownerId: owner?.id },
    });
    return NextResponse.json({ contact }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ contacts });
}

