import prisma from "@/config/postgres.config";

const MSIP_URL =
  "https://msip3.um.krakow.pl/server/rest/services/Edukacja/EK_PLACOWKI/MapServer/0/query";

export async function fetchSchools() {
  const params = new URLSearchParams({
    f: "json",
    where: "1=1",
    outFields: "*", // only need the name field
    resultRecordCount: "100000", // limit how many you fetch at once
  });

  const resp = await fetch(`${MSIP_URL}?${params.toString()}`);
  if (!resp.ok) {
    throw new Error(`HTTP error ${resp.status}`);
  }
  const data = (await resp.json()) as any;

  const schools = data.features.map((feature: any) => feature.attributes);

  return schools;
}

export async function syncSchools() {
  console.log("🔄 Syncing schools...");
  const schools = await fetchSchools();
  for (const s of schools) {
    await prisma.school.upsert({
      where: { objectid: s.objectid },
      update: {
        name: s.nz_pl,
        street: s.nz_ul,
        building: s.nr_bud,
        postal: s.kod_p,
        phone: s.nr_tel,
        email: s.email,
        www: s.www,
        type: s.typ_pl,
        updatedAt: new Date(s.data_akt),
        addedAt: new Date(), // in case it was null
      },
      create: {
        objectid: s.objectid,
        name: s.nz_pl,
        street: s.nz_ul,
        building: s.nr_bud,
        postal: s.kod_p,
        phone: s.nr_tel,
        email: s.email,
        www: s.www,
        type: s.typ_pl,
        updatedAt: new Date(s.data_akt),
        addedAt: new Date(),
      },
    });
  }

  console.log(`✅ Synced ${schools.length} schools.`);
}

export async function checkSchools() {
  const count = await prisma.school.count();

  if (count === 0) {
    await syncSchools();
  } else {
    const latestSchool = await prisma.school.findFirst({
      orderBy: { addedAt: "desc" },
    });
    if (latestSchool) {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      if (latestSchool.addedAt < oneMonthAgo) {
        await syncSchools();
      }
    }
  }
}
