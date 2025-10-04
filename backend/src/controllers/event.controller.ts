import prisma from "@/config/postgres.config";
import type { Event } from "@shared/types/event.types";

export async function getEvents(page: number, pageSize: number) {
  const events = await prisma.event.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      title: true,
      images: true,
      location: true,
      date: true,
      description: false,
      capacity: false,
    },
  });

  const totalEvents = await prisma.event.count();

  return {
    events,
    totalPages: Math.ceil(totalEvents / pageSize),
    currentPage: page,
  };
}

export async function saveEvent(eventData: Event) {
  const category = await prisma.eventCategory.findUnique({
    where: { name: eventData.category },
  });

  if (!category) {
    throw new Error("Invalid category");
  }

  const event = await prisma.event.create({
    data: { ...eventData, categoryId: category.id, organizationId: "0" },
  });

  const urls: {
    secret: string;
    filename: string;
    url: string;
  }[] = [];

  for (const image of eventData.images) {
    const secret = Bun.randomUUIDv7();
    urls.push({
      secret,
      filename: image,
      url: `${event.id}/${image}`,
    });

    await prisma.secureUpload.create({
      data: {
        filename: image,
        url: `${event.id}/${image}`,
        secret,
      },
    });
  }

  return urls;
}

export async function getUploadByUrl(url: string, secret: string) {
  return await prisma.secureUpload.findFirst({
    where: {
      url,
      secret,
    },
  });
}
