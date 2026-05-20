import { getDistanceKm } from "@/lib/geo";
import { prisma } from "@/lib/prisma";
import { TUser } from "@/types/prisma.type";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get("lat") ?? "0");
  const lng = parseFloat(searchParams.get("lng") ?? "0");
  const radiusKm = parseFloat(searchParams.get("radius") ?? "1");

  const delta = radiusKm / 111;
  const masters = await prisma.user.findMany({
    where: {
      role: "MASTER",
      latitude: { gte: lat - delta, lte: lat + delta },
      longitude: { gte: lng - delta, lte: lng + delta },
    },
    include: { masterProfile: true },
  });

  const nearby = masters.filter((m: TUser) => {
    if (!m.latitude || !m.longitude) return false;
    return getDistanceKm(lat, lng, m.latitude, m.longitude) <= radiusKm;
  });

  return NextResponse.json(nearby);
}