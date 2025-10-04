import type { AuthToken, LoginData, SignUpData, AuthToken as Token, User } from "@/types/auth";
import { validateResponse } from ".";
import { url } from "./const";

export async function authenticate(data: AuthToken): Promise<User> {
  const response = await fetch(`${url}/auth`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  try {
    const body = await validateResponse<User>(response);
    return body;
  } catch (error) {
    throw error;
  }
}

export async function signIn(data: LoginData): Promise<Token> {
  const response = await fetch(`${url}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  try {
    const body = await validateResponse<Token>(response);
    return body;
  } catch (error) {
    throw error;
  }
}

export async function signUp(data: SignUpData): Promise<Token> {
  const response = await fetch(`${url}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  try {
    const body = await validateResponse<Token>(response);
    return body;
  } catch (error) {
    throw error;
  }
}

export async function signOut(): Promise<void> {
  const response = await fetch(`${url}/auth/signout`, {
    method: "POST",
    credentials: "include",
  });

  try {
    await validateResponse<void>(response);
  } catch (error) {
    throw error;
  }
}
