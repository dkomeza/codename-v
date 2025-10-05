import "@/app";
import { afterAll, beforeEach, describe, expect, test } from "bun:test";

import prisma from "@/config/postgres.config";
import { fetchUsers } from "@shared/api/admin";
import * as auth from "@shared/api/auth";

beforeEach(async () => {
  // Clean up database after each test
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.user.deleteMany();
});

describe("Sign Up", async () => {
  test("should sign up a new user", async () => {
    const token = await auth.signUp({
      email: "test@example.com",
      password: "password!1A",
      name: "Test",
      surname: "User",
      birthDate: new Date("2000-01-01"),
      confirmPassword: "password!1A",
    });

    expect(token).toBeDefined();
    expect(token.token).toBeDefined();
    expect(token.token.length).toBeGreaterThan(0);
  });

  test("should not sign up a user with an existing email", async () => {
    await auth.signUp({
      email: "test@example.com",
      password: "password!1A",
      name: "Test",
      surname: "User",
      birthDate: new Date("2000-01-01"),
      confirmPassword: "password!1A",
    });

    try {
      const token = await auth.signUp({
        email: "test@example.com",
        password: "password!1A",
        name: "Test",
        surname: "User",
        birthDate: new Date("2000-01-01"),
        confirmPassword: "password!1A",
      });
    } catch (error: any) {
      expect(error.message).toBe("User with this email already exists!");
    }
  });
});

describe("Sign In", async () => {
  test("should sign in an existing user", async () => {
    await auth.signUp({
      email: "test@example.com",
      password: "password!1A",
      name: "Test",
      surname: "User",
      birthDate: new Date("2000-01-01"),
      confirmPassword: "password!1A",
    });

    const token = await auth.signIn({
      email: "test@example.com",
      password: "password!1A",
    });

    expect(token).toBeDefined();
    expect(token.token).toBeDefined();
    expect(token.token.length).toBeGreaterThan(0);
  });

  test("should not sign in with incorrect password", async () => {
    await auth.signUp({
      email: "test@example.com",
      password: "password!1A",
      name: "Test",
      surname: "User",
      birthDate: new Date("2000-01-01"),
      confirmPassword: "password!1A",
    });

    try {
      const token = await auth.signIn({
        email: "test@example.com",
        password: "wrongpassword",
      });
    } catch (error: any) {
      expect(error.message).toBe("Invalid password or email!");
    }
  });

  test("should not sign in with wrong data", async () => {
    try {
      await auth.signIn({
        email: "notanemail",
        password: "short",
      });
    } catch (error: any) {
      expect(error.message).toBe("Invalid request data: Invalid email address");
    }
  });
});

describe("Authentication", async () => {
  test("should authenticate a user with a valid token", async () => {
    const signUpToken = await auth.signUp({
      email: "test@example.com",
      password: "password!1A",
      name: "Test",
      surname: "User",
      birthDate: new Date("2000-01-01"),
      confirmPassword: "password!1A",
    });
    const user = await auth.authenticate({ token: signUpToken.token });

    expect(user).toBeDefined();
    expect(user.email).toBe("test@example.com");
    expect(user.name).toBe("Test");
  });

  test("should not authenticate with an invalid token", async () => {
    try {
      const user = await auth.authenticate({ token: "invalidtoken" });
    } catch (error: any) {
      expect(error.message).toBe("Invalid token!");
    }
  });

  test("should not authenticate with a missing token", async () => {
    try {
      const user = await auth.authenticate({ token: "" });
    } catch (error: any) {
      expect(error.message).toBe("Token not provided!");
    }
  });

  test("should not authenticate with a non-existent user", async () => {
    const signUpToken = await auth.signUp({
      email: "nonexistent@example.com",
      password: "password!1A",
      name: "NonExistent",
      surname: "User",
      birthDate: new Date("2000-01-01"),
      confirmPassword: "password!1A",
    });
    // Delete the user to simulate non-existence
    await prisma.user.deleteMany({ where: { email: "nonexistent@example.com" } });
    try {
      const user = await auth.authenticate({ token: signUpToken.token });
    } catch (error: any) {
      expect(error.message).toBe("User not found!");
    }
  });

  test("Should not have access to protected route with wrong permissions", async () => {
    const signUpToken = await auth.signUp({
      email: "test@example.com",
      password: "password!1A",
      name: "Test",
      surname: "User",
      birthDate: new Date("2000-01-01"),
      confirmPassword: "password!1A",
    });

    try {
      const users = await fetchUsers({ token: signUpToken.token, page: 1, limit: 10 });
    } catch (error: any) {
      expect(error.message).toBe("User does not have permission to access this resource!");
    }
  });
});
