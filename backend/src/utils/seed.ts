import { PrismaClient, UserType } from "@prisma/client";
import process from "process";

const prisma = new PrismaClient();

// Helper function to generate random dates
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper function to pick random items from array
const randomPick = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Helper function to pick multiple random items
const randomPickMultiple = <T>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, arr.length));
};

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  console.log("🧹 Cleaning database...");
  await prisma.opinion.deleteMany();
  await prisma.message.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.application.deleteMany();
  await prisma.event.deleteMany();
  await prisma.eventCategory.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.school.deleteMany();
  await prisma.secureUpload.deleteMany();

  // Create Organizations
  console.log("🏢 Creating organizations...");
  const organizations = await Promise.all([
    prisma.organization.create({
      data: { organizationName: "Green Earth Foundation" },
    }),
    prisma.organization.create({
      data: { organizationName: "Community Care Network" },
    }),
    prisma.organization.create({
      data: { organizationName: "Youth Empowerment Alliance" },
    }),
    prisma.organization.create({
      data: { organizationName: "Animal Rescue Coalition" },
    }),
    prisma.organization.create({
      data: { organizationName: "Food Bank United" },
    }),
  ]);

  // Create Event Categories
  console.log("📁 Creating event categories...");
  const categories = await Promise.all([
    prisma.eventCategory.create({ data: { name: "Environmental" } }),
    prisma.eventCategory.create({ data: { name: "Community Service" } }),
    prisma.eventCategory.create({ data: { name: "Education" } }),
    prisma.eventCategory.create({ data: { name: "Animal Welfare" } }),
    prisma.eventCategory.create({ data: { name: "Food Distribution" } }),
    prisma.eventCategory.create({ data: { name: "Healthcare" } }),
    prisma.eventCategory.create({ data: { name: "Arts & Culture" } }),
    prisma.eventCategory.create({ data: { name: "Sports & Recreation" } }),
  ]);

  // Create Users
  console.log("👥 Creating users...");
  const hashedPassword = Bun.password.hashSync("password123");

  const adminUser = await prisma.user.create({
    data: {
      type: UserType.ADMIN,
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin",
      surname: "User",
      birthDate: new Date("1985-05-15"),
    },
  });

  const orgUsers = await Promise.all(
    organizations.map((org, idx) =>
      prisma.user.create({
        data: {
          type: UserType.ORG,
          email: `org${idx + 1}@example.com`,
          password: hashedPassword,
          name: `Organization`,
          surname: `Manager ${idx + 1}`,
          organizationId: org.id,
          birthDate: new Date(`198${idx}-06-20`),
        },
      })
    )
  );

  const coordinators = await Promise.all([
    prisma.user.create({
      data: {
        type: UserType.COORDINATOR,
        email: "coordinator1@example.com",
        password: hashedPassword,
        name: "Sarah",
        surname: "Johnson",
        organizationId: organizations[0].id,
        birthDate: new Date("1990-03-12"),
      },
    }),
    prisma.user.create({
      data: {
        type: UserType.COORDINATOR,
        email: "coordinator2@example.com",
        password: hashedPassword,
        name: "Michael",
        surname: "Chen",
        organizationId: organizations[1].id,
        birthDate: new Date("1988-08-25"),
      },
    }),
    prisma.user.create({
      data: {
        type: UserType.COORDINATOR,
        email: "coordinator3@example.com",
        password: hashedPassword,
        name: "Emma",
        surname: "Rodriguez",
        organizationId: organizations[2].id,
        birthDate: new Date("1992-11-30"),
      },
    }),
  ]);

  const volunteers = await Promise.all([
    prisma.user.create({
      data: {
        type: UserType.VOLUNTEER,
        email: "volunteer1@example.com",
        password: hashedPassword,
        name: "John",
        surname: "Smith",
        birthDate: new Date("1995-01-10"),
      },
    }),
    prisma.user.create({
      data: {
        type: UserType.VOLUNTEER,
        email: "volunteer2@example.com",
        password: hashedPassword,
        name: "Emily",
        surname: "Davis",
        birthDate: new Date("1998-07-22"),
      },
    }),
    prisma.user.create({
      data: {
        type: UserType.VOLUNTEER,
        email: "volunteer3@example.com",
        password: hashedPassword,
        name: "David",
        surname: "Martinez",
        birthDate: new Date("1997-04-15"),
      },
    }),
    prisma.user.create({
      data: {
        type: UserType.VOLUNTEER,
        email: "volunteer4@example.com",
        password: hashedPassword,
        name: "Jessica",
        surname: "Wilson",
        birthDate: new Date("1999-09-05"),
      },
    }),
    prisma.user.create({
      data: {
        type: UserType.VOLUNTEER,
        email: "volunteer5@example.com",
        password: hashedPassword,
        name: "Christopher",
        surname: "Brown",
        birthDate: new Date("1996-12-18"),
      },
    }),
    prisma.user.create({
      data: {
        type: UserType.VOLUNTEER,
        email: "volunteer6@example.com",
        password: hashedPassword,
        name: "Amanda",
        surname: "Taylor",
        birthDate: new Date("2000-02-28"),
      },
    }),
    prisma.user.create({
      data: {
        type: UserType.VOLUNTEER,
        email: "volunteer7@example.com",
        password: hashedPassword,
        name: "Daniel",
        surname: "Anderson",
        birthDate: new Date("1994-06-11"),
      },
    }),
    prisma.user.create({
      data: {
        type: UserType.VOLUNTEER,
        email: "volunteer8@example.com",
        password: hashedPassword,
        name: "Sophia",
        surname: "Thomas",
        birthDate: new Date("2001-03-20"),
      },
    }),
  ]);

  // Create Events
  console.log("🎉 Creating events...");
  const eventTemplates = [
    {
      title: "Beach Cleanup Day",
      capacity: 50,
      location: "Santa Monica Beach, CA",
      description: "Join us for a community beach cleanup to protect marine life.",
      categoryIdx: 0,
      orgIdx: 0,
    },
    {
      title: "Tree Planting Initiative",
      capacity: 30,
      location: "Central Park, NY",
      description: "Help us plant 100 trees to combat climate change and beautify.",
      categoryIdx: 0,
      orgIdx: 0,
    },
    {
      title: "Community Food Drive",
      capacity: 25,
      location: "Downtown Community Center",
      description: "Organize and distribute food packages to families in need.",
      categoryIdx: 4,
      orgIdx: 4,
    },
    {
      title: "Youth Mentorship Program",
      capacity: 15,
      location: "Lincoln High School",
      description: "Mentor high school students in career development.",
      categoryIdx: 2,
      orgIdx: 2,
    },
    {
      title: "Animal Shelter Volunteer Day",
      capacity: 20,
      location: "City Animal Shelter",
      description: "Help care for rescued animals and assist with adoptions.",
      categoryIdx: 3,
      orgIdx: 3,
    },
    {
      title: "Senior Citizens Tech Workshop",
      capacity: 40,
      location: "Community Library",
      description: "Teach seniors how to use smartphones and tablets.",
      categoryIdx: 1,
      orgIdx: 1,
    },
    {
      title: "Neighborhood Cleanup",
      capacity: 35,
      location: "Various locations",
      description: "Help keep our neighborhood clean and beautiful.",
      categoryIdx: 1,
      orgIdx: 1,
    },
    {
      title: "Homeless Shelter Meal Service",
      capacity: 20,
      location: "Hope Shelter",
      description: "Prepare and serve meals to homeless individuals.",
      categoryIdx: 4,
      orgIdx: 4,
    },
    {
      title: "Wildlife Conservation Workshop",
      capacity: 25,
      location: "Nature Reserve",
      description: "Learn about and assist with wildlife conservation.",
      categoryIdx: 3,
      orgIdx: 3,
    },
    {
      title: "Free Health Screening Event",
      capacity: 60,
      location: "City Health Center",
      description: "Volunteer to help organize free health screenings.",
      categoryIdx: 5,
      orgIdx: 1,
    },
    {
      title: "Arts & Crafts for Kids",
      capacity: 30,
      location: "Community Arts Center",
      description: "Lead creative workshops for underprivileged children.",
      categoryIdx: 6,
      orgIdx: 2,
    },
    {
      title: "River Restoration Project",
      capacity: 40,
      location: "Riverside Park",
      description: "Help restore the local river ecosystem.",
      categoryIdx: 0,
      orgIdx: 0,
    },
  ];

  const events = await Promise.all(
    eventTemplates.map((template, idx) => {
      const isPast = idx % 3 === 0;
      const date = isPast
        ? randomDate(new Date("2024-01-01"), new Date("2024-10-01"))
        : randomDate(new Date("2025-10-10"), new Date("2026-12-31"));

      return prisma.event.create({
        data: {
          title: template.title,
          images: [
            `https://picsum.photos/seed/${idx}1/800/600`,
            `https://picsum.photos/seed/${idx}2/800/600`,
            `https://picsum.photos/seed/${idx}3/800/600`,
          ],
          capacity: template.capacity,
          location: template.location,
          description: template.description,
          date,
          categoryId: categories[template.categoryIdx].id,
          organizationId: organizations[template.orgIdx].id,
        },
      });
    })
  );

  // Create Applications
  console.log("📝 Creating applications...");
  const applications = [];
  for (const event of events) {
    const numApplications = Math.floor(Math.random() * (event.capacity * 0.8));
    const selectedVolunteers = randomPickMultiple(volunteers, numApplications);

    for (const volunteer of selectedVolunteers) {
      const application = await prisma.application.create({
        data: {
          organizationId: event.organizationId,
          userId: volunteer.id,
          eventId: event.id,
        },
      });
      applications.push(application);
    }
  }

  // Create Opinions for past events
  console.log("⭐ Creating opinions...");
  const pastEvents = events.filter((e) => e.date < new Date("2025-10-05"));
  for (const event of pastEvents) {
    const eventApplications = applications.filter((app) => app.eventId === event.id);
    const numOpinions = Math.floor(eventApplications.length * 0.7);

    for (let i = 0; i < numOpinions; i++) {
      const app = eventApplications[i];
      await prisma.opinion.create({
        data: {
          rating: Math.random() * 2 + 3,
          comment: randomPick([
            "Great experience! Would definitely volunteer again.",
            "Well organized event, learned a lot.",
            "Amazing team and wonderful cause.",
            "Very fulfilling experience.",
            "The coordinators were very helpful and supportive.",
            "Made a real difference in the community.",
            "Could use better communication beforehand.",
            "Excellent organization and clear instructions.",
          ]),
          authorId: app.userId,
          eventId: event.id,
        },
      });
    }
  }

  // Create Chats and Messages
  console.log("💬 Creating chats and messages...");
  for (let i = 0; i < 8; i++) {
    const chatUsers = randomPickMultiple([...volunteers, ...coordinators], 2);

    const chat = await prisma.chat.create({
      data: {
        users: {
          connect: chatUsers.map((u) => ({ id: u.id })),
        },
      },
    });

    const numMessages = Math.floor(Math.random() * 15) + 5;
    for (let j = 0; j < numMessages; j++) {
      await prisma.message.create({
        data: {
          senderUserId: randomPick(chatUsers).id,
          chatId: chat.id,
          message: randomPick([
            "Hi! Are you attending the event tomorrow?",
            "Yes, I'm really excited!",
            "What time should we meet?",
            "The event starts at 9 AM.",
            "Do I need to bring anything?",
            "Just wear comfortable clothes.",
            "Thanks for the info!",
            "See you there!",
            "Looking forward to it.",
            "Great working with you today!",
          ]),
          messageTime: randomDate(new Date("2025-09-01"), new Date("2025-10-05")),
        },
      });
    }
  }

  // Create Schools
  console.log("🏫 Creating schools...");
  await Promise.all([
    prisma.school.create({
      data: {
        objectid: 1001,
        name: "Lincoln High School",
        street: "123 Main Street",
        building: "Building A",
        postal: "90001",
        phone: "555-0101",
        email: "info@lincolnhs.edu",
        www: "https://lincolnhs.edu",
        type: "Public High School",
        updatedAt: new Date(),
        addedAt: new Date("2020-01-15"),
      },
    }),
    prisma.school.create({
      data: {
        objectid: 1002,
        name: "Washington Elementary",
        street: "456 Oak Avenue",
        building: "Main Building",
        postal: "90002",
        phone: "555-0102",
        email: "contact@washingtonelem.edu",
        www: "https://washingtonelem.edu",
        type: "Public Elementary",
        updatedAt: new Date(),
        addedAt: new Date("2018-06-20"),
      },
    }),
    prisma.school.create({
      data: {
        objectid: 1003,
        name: "Jefferson Middle School",
        street: "789 Pine Road",
        building: null,
        postal: "90003",
        phone: "555-0103",
        email: "admin@jeffersonms.edu",
        www: "https://jeffersonms.edu",
        type: "Public Middle School",
        updatedAt: new Date(),
        addedAt: new Date("2019-03-10"),
      },
    }),
  ]);

  // Create Secure Uploads
  console.log("🔒 Creating secure uploads...");
  await Promise.all([
    prisma.secureUpload.create({
      data: {
        secret: "abc123def456",
        filename: "event-poster-1.jpg",
        url: "https://storage.example.com/uploads/event-poster-1.jpg",
      },
    }),
    prisma.secureUpload.create({
      data: {
        secret: "xyz789uvw012",
        filename: "volunteer-certificate.pdf",
        url: "https://storage.example.com/uploads/cert-template.pdf",
      },
    }),
    prisma.secureUpload.create({
      data: {
        secret: "mno345pqr678",
        filename: "organization-logo.png",
        url: "https://storage.example.com/uploads/logo.png",
      },
    }),
  ]);

  console.log("✅ Database seeding completed successfully!");
  console.log(`
📊 Summary:
- Organizations: ${organizations.length}
- Event Categories: ${categories.length}
- Users: ${1 + orgUsers.length + coordinators.length + volunteers.length}
  - Admin: 1
  - Org Users: ${orgUsers.length}
  - Coordinators: ${coordinators.length}
  - Volunteers: ${volunteers.length}
- Events: ${events.length}
- Applications: ${applications.length}
- Opinions: Created for past events
- Chats: 8 with messages
- Schools: 3
- Secure Uploads: 3
  `);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
