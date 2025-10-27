import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const parties = await prisma.party.findMany({
      include: {
        chairs: true,
        locations: true,
      },
    });
    return res.status(200).json(parties);
  }

  if (req.method === "POST") {
    const data = req.body;

    const newParty = await prisma.party.create({
      data: {
        englishName: data.englishName,
        arabicName: data.arabicName,
        abbr: data.abbr,
        numberOfVoting: data.numberOfVoting,
        numberOfSubscribing: data.numberOfSubscribing,
        chairs: {
          create: {
            thisYear: data.chairs.thisYear,
            lastYear: data.chairs.lastYear,
          },
        },
        locations: {
          create: data.locations.map((loc) => ({
            regionCode: loc.regionCode,
            numberOfVoting: loc.numberOfVoting,
            numberOfSubscribing: loc.numberOfSubscribing,
          })),
        },
      },
      include: {
        chairs: true,
        locations: true,
      },
    });

    return res.status(201).json(newParty);
  }

  res.status(405).end();
}
