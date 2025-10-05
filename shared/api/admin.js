import { validateResponse } from ".";
import { url } from "./const";
export async function fetchUsers(data) {
    const response = await fetch(`${url}/admin/users?page=${data.page}&limit=${data.limit}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
        },
    });
    const a = await validateResponse(response);
    const b = a.map((user) => ({
        ...user,
        birthDate: new Date(user.birthDate),
    }));
    return b;
}
export async function createUser(data) {
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
    return await validateResponse(response);
}
export async function modifyUser(data) {
    const response = await fetch(`${url}/admin/users/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(data),
    });
    return await validateResponse(response);
}
export async function deleteUser(data) {
    const response = await fetch(`${url}/admin/users/${data.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
        },
    });
    return await validateResponse(response);
}
