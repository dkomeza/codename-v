import prisma from "@/config/postgres.config";
import type { Event } from "@shared/types/event.types";

export async function saveEvent(eventData: Event) {
  const event = await prisma.event.create({ data: eventData });

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