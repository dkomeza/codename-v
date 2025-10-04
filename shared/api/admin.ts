import type { AdminUsersRequest, User } from "@/types/admin.types";
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

  return await validateResponse<User[]>(response);
}
