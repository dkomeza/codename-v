import "@/app";
import { afterAll, beforeEach, describe, expect, test } from "bun:test";

import prisma from "@/config/postgres.config";
import { login } from "@/controllers/auth.controller";
import { createUser, fetchUsers } from "@shared/api/admin";

beforeEach(async () => {
  // Clean up database after each test
  await prisma.user.deleteMany();

  // Create an admin user for testing
  await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: Bun.password.hashSync("securepassword"),
      name: "Admin",
      surname: "User",
      type: "ADMIN",
      birthDate: new Date("1990-01-01"),
    },
  });
});

afterAll(async () => {
  await prisma.user.deleteMany();
});

describe("User related tests", () => {
  test("Fetch users", async () => {
    const token = await login("admin@example.com", "securepassword");

    const users = await fetchUsers({ token, page: 1, limit: 10 });
    expect(users.length).toBe(1);
  });

  test("Create a new user", async () => {
    const token = await login("admin@example.com", "securepassword");

    const newUser = {
      email: "newuser@example.com",
      password: "newpassword",
      name: "New",
      surname: "User",
      type: "VOLUNTEER" as const,
      birthDate: new Date("1995-01-01"),
    };

    await createUser({ token, ...newUser });
    const users = await fetchUsers({ token, page: 1, limit: 10 });
    expect(users.length).toBe(2);
    expect(users[1].email).toBe("newuser@example.com");
  });

  test("Fail to create user with existing email", async () => {
    const token = await login("admin@example.com", "securepassword");

    const newUser = {
      email: "newuser@example.com",
      password: "newpassword",
      name: "New",
      surname: "User",
      type: "VOLUNTEER" as const,
      birthDate: new Date("1995-01-01"),
    };

    await createUser({ token, ...newUser });

    try {
      await createUser({ token, ...newUser });
    } catch (e: any) {
      expect(e.message).toBe("User with this email already exists!");
    }
  });

  test("Fail to create user with invalid data", async () => {
    const token = await login("admin@example.com", "securepassword");

    const newUser = {
      email: "invalidemail",
      password: "short",
      name: "New",
      surname: "User",
      type: "VOLUNTEER" as const,
      birthDate: new Date("1995-01-01"),
    };

    try {
      await createUser({ token, ...newUser });
    } catch (e: any) {
      expect(e.message).toBe("Invalid request data: Nieprawidłowy format email");
    }
  });
});
