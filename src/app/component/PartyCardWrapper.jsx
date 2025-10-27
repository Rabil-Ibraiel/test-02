import PartyCard from "./Card";

import prisma from "../../lib/prisma";
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randBig(min, max) {
  const num = randInt(min, max);
  return BigInt(num);
}
const PartyCardWrapper = async () => {
  // const parties = [
  //   {
  //     englishName: "Construction and Development Coalition",
  //     arabicName: "ائتلاف الإعمار والتنمية",
  //     abbr: "EDC",
  //     color: "#42b6ad",
  //     chairs: 207,
  //   },
  //   {
  //     englishName: "State of Law Coalition",
  //     arabicName: "دول القانون",
  //     abbr: "SOL",
  //     color: "#9dbe3c",
  //     chairs: 257,
  //   },
  //   {
  //     englishName: "Al-Sadiqoun Bloc",
  //     arabicName: "صادقون",
  //     abbr: "SDQ",
  //     color: "#29615e",
  //     chairs: 202,
  //   },
  //   {
  //     englishName: "Badr Organization",
  //     arabicName: "منظمة بدر",
  //     abbr: "BADR",
  //     color: "#368a29",
  //     chairs: 218,
  //   },
  //   {
  //     englishName: "Ashir BiIraq",
  //     arabicName: "أشير بالعراق",
  //     abbr: "ASHIR",
  //     color: "#caaf1b",
  //     chairs: 224,
  //   },
  //   {
  //     englishName: "Al-Asas Al-Iraqi",
  //     arabicName: "الاساس العراقي",
  //     abbr: "ASI",
  //     color: "#0f4463",
  //     chairs: 244,
  //   },
  //   {
  //     englishName: "Kurdistan Democratic Party",
  //     arabicName: "الحزب الديمقراطي الكردستاني",
  //     abbr: "KDP",
  //     color: "#ffd700",
  //     chairs: 275,
  //   },
  //   {
  //     englishName: "Patriotic Union of Kurdistan",
  //     arabicName: "الاتحاد الوطني الكردستاني",
  //     abbr: "PUK",
  //     color: "#11ff02",
  //     chairs: 222,
  //   },
  //   {
  //     englishName: "National Determination Coalition",
  //     arabicName: "تحالف الحسم الوطني",
  //     abbr: "NDC",
  //     color: "#892f2f",
  //     chairs: 269,
  //   },
  //   {
  //     englishName: "Taqaddum Party",
  //     arabicName: "حزب تقدم",
  //     abbr: "TQD",
  //     color: "#f6851d",
  //     chairs: 255,
  //   },
  //   {
  //     englishName: "Azm Alliance",
  //     arabicName: "تحالف عزم",
  //     abbr: "AZM",
  //     color: "#cbff91",
  //     chairs: 241,
  //   },
  //   {
  //     englishName: "Siyada / Tashreea Coalition",
  //     arabicName: "تحالف السيادة/تشريع",
  //     abbr: "SIA",
  //     color: "#cdb160",
  //     chairs: 221,
  //   },
  //   {
  //     englishName: "National State Forces Coalition",
  //     arabicName: "تحالف قوى الدولة الوطنية",
  //     abbr: "NSFC",
  //     color: "#056fc7",
  //     chairs: 231,
  //   },
  //   {
  //     englishName: "Services Coalition",
  //     arabicName: "تحالف خدمات",
  //     abbr: "SERV",
  //     color: "#eaff88",
  //     chairs: 271,
  //   },
  // ];

  // for (const [i, p] of parties.entries()) {
  //   const numberOfVoting = randBig(100_000_000, 999_999_999);
  //   const numberOfSubscribing = randBig(100_000_000, 999_999_999);
  //   const lastYearChairs = randInt(1, 99);

  //   const query = `
  //     INSERT INTO Party
  //     (id, englishName, arabicName, abbr, numberOfVoting, numberOfSubscribing, lastYearChairs, thisYearChairs, color)
  //     VALUES (
  //       ${i + 1},
  //       '${p.englishName.replace(/'/g, "''")}',
  //       '${p.arabicName.replace(/'/g, "''")}',
  //       '${p.abbr}',
  //       ${numberOfVoting},
  //       ${numberOfSubscribing},
  //       ${lastYearChairs},
  //       ${p.chairs},
  //       '${p.color}'
  //     )
  //     ON DUPLICATE KEY UPDATE id = id;
  //   `;

  //   await prisma.$executeRawUnsafe(query);
  // }
  // for (let i = 1; i <= parties.length; i++) {
  //   const query = `
  //     INSERT INTO Location
  //     (regionCode, numberOfVoting, numberOfSubscribing, partyId)
  //     VALUES
  //     ('AR', ${randBig(100_000_000, 999_999_999)}, ${randBig(
  //     100_000_000,
  //     999_999_999
  //   )}, ${i}),
  //     ('BG', ${randBig(100_000_000, 999_999_999)}, ${randBig(
  //     100_000_000,
  //     999_999_999
  //   )}, ${i})
  //     ON DUPLICATE KEY UPDATE regionCode = regionCode;
  //   `;
  //   await prisma.$executeRawUnsafe(query);
  // }
  const partiesa = await prisma.party?.findMany({
    include: { locations: true },
    orderBy: { id: "asc" },
  });
  console.log(partiesa);

  return (
    <div className="mt-3 text-[rgb(26,40,107)] flex flex-col gap-3 overflow-hidden">
      {partiesa?.map((party) => (
        <PartyCard key={party.id} party={party} />
      ))}
    </div>
  );
};

export default PartyCardWrapper;
