// /app/actions/getParties.js
"use server";
import { cache } from "react";
import prisma from "../../lib/prisma";

/**
 * getPartiesByRegion(regionCode)
 * - DB-level aggregation + sort + limit (1 roundtrip for ranking)
 * - Fetch only the fields the UI renders
 * - Preserve output shape (locations[0].numberOfVoting for the region)
 */
export const getPartiesByRegion = cache(async (regionCode) => {
  // Aggregate votes per party within the region and rank in the DB
  const top = await prisma.location.groupBy({
    where: { regionCode },
    by: ["partyId"],
    _sum: { numberOfVoting: true },
    orderBy: [
      { _sum: { numberOfVoting: "desc" } }, // main sort
      { partyId: "asc" },                    // stable tiebreaker
    ],
    take: 6,
  });

  if (top.length === 0) return [];

  // Fetch only needed party fields
  const ids = top.map((t) => t.partyId);
  const parties = await prisma.party.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      englishName: true,
      arabicName: true,
      abbr: true,
      numberOfVoting: true,
      numberOfSubscribing: true,
      color: true,
      thisYearChairs: true,
      lastYearChairs: true,
    },
  });

  const byId = new Map(parties.map((p) => [p.id, p]));

  // Return in ranked order with a single regional location entry
  return top
    .map((t) => {
      const p = byId.get(t.partyId);
      if (!p) return null;
      return {
        ...p,
        locations: [
          {
            regionCode,
            // Keep BigInt where applicable to preserve semantics used by UI
            numberOfVoting: t._sum.numberOfVoting ?? 0n,
          },
        ],
      };
    })
    .filter(Boolean);
});

/**
 * getTopParties()
 * - DB-ordered top K
 * - Minimal select
 */
export const getTopParties = cache(async () => {
  return prisma.party.findMany({
    orderBy: { numberOfVoting: "desc" },
    take: 6,
    select: {
      id: true,
      englishName: true,
      arabicName: true,
      abbr: true,
      numberOfVoting: true,
      numberOfSubscribing: true,
      color: true,
      thisYearChairs: true,
    },
  });
});

/**
 * getParties()
 * - Minimal select used across marquee/cards
 * - Stable order by id asc
 */
export const getParties = cache(async () => {
  return prisma.party.findMany({
    select: {
      id: true,
      englishName: true,
      arabicName: true,
      abbr: true,
      numberOfVoting: true,
      numberOfSubscribing: true,
      color: true,
      thisYearChairs: true,
      lastYearChairs: true,
    },
    orderBy: { id: "asc" },
  });
});
