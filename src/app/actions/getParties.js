// /app/actions/getParties.js
"use server";
import prisma from "@/lib/prisma";

export async function getPartiesByRegion(regionCode) {
  // Step 1: Fetch all parties that have at least one location for that region
  const parties = await prisma.party.findMany({
    where: {
      locations: {
        some: { regionCode },
      },
    },
    include: {
      // Step 2: Only include the location for that region
      locations: {
        where: { regionCode },
        select: { numberOfVoting: true },
      },
    },
  });

  // Step 3: Sort them by that region’s numberOfVoting (descending)
  const sorted = parties
    .sort(
      (a, b) =>
        Number(b.locations[0]?.numberOfVoting || 0) -
        Number(a.locations[0]?.numberOfVoting || 0)
    )
    .slice(0, 6); // Step 4: Limit to top 7

  return sorted;
}

export async function getTopParties() {
  const parties = await prisma.party.findMany({
    orderBy: {
      numberOfVoting: "desc", // 🔽 sort by total votes (Party table)
    },
    take: 6, // 🔢 limit to top 7
    select: {
      id: true,
      englishName: true,
      arabicName: true,
      abbr: true,
      numberOfVoting: true,
      color: true,
    },
  });

  return parties;
}

export async function getParties() {
  const parties = await prisma.party.findMany();

  return parties;
}
