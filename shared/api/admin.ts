import type { AdminNewUser, AdminUsersRequest, User } from "@/types/admin.types";
import { validateResponse } from ".";
import { url } from "./const";

export async function fetchUsers(data: AdminUsersRequest): Promise<User[]> {
  const response = await fetch(`${url}/admin/users?page=${data.page}&limit=${data.limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
  });

  const a = await validateResponse<User[]>(response);

  const b = a.map((user) => ({
    ...user,
    birthDate: new Date(user.birthDate),
  }));

  return b;
}

export async function createUser(data: AdminNewUser & { token: string }): Promise<void> {
  const response = await fetch(`${url}/admin/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      type: data.type,
      birthDate: data.birthDate,
    }),
  });

  return await validateResponse<void>(response);
}

export async function modifyUser(
  data: Partial<AdminNewUser> & { token: string; id: string }
): Promise<void> {
  const response = await fetch(`${url}/admin/users/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify(data),
  });

  return await validateResponse<void>(response);
}

export async function deleteUser(data: { token: string; id: string }): Promise<void> {
  const response = await fetch(`${url}/admin/users/${data.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
  });

  return await validateResponse<void>(response);
}
