import prisma from "../../../lib/prisma";

// GET /api/parties — returns all parties with locations
export async function GET() {
  const parties = await prisma.party.findMany({
    include: {
      locations: true,
    },
  });
  return Response.json(parties);
}

// POST /api/parties — create a party with optional locations
export async function POST(request) {
  const data = await request.json();

  const newParty = await prisma.party.create({
    data: {
      englishName: data.englishName,
      arabicName: data.arabicName,
      abbr: data.abbr,
      numberOfVoting: data.numberOfVoting,
      numberOfSubscribing: data.numberOfSubscribing,
      lastYearChairs: data.lastYearChairs ?? 0,
      thisYearChairs: data.thisYearChairs ?? 0,
      color: data.color ?? "#000000",
      locations: data.locations
        ? {
            create: data.locations.map((loc) => ({
              regionCode: loc.regionCode,
              numberOfVoting: loc.numberOfVoting,
              numberOfSubscribing: loc.numberOfSubscribing,
            })),
          }
        : undefined,
    },
    include: {
      locations: true,
    },
  });

  return Response.json(newParty, { status: 201 });
}
