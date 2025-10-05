import { validateResponse } from ".";
import { url } from "./const";
export async function authenticate(data) {
    const response = await fetch(`${url}/auth`, {
        credentials: "include",
        headers: {
            Authorization: `Bearer ${data.token}`,
        },
    });
    try {
        const body = await validateResponse(response);
        return body;
    }
    catch (error) {
        throw error;
    }
}
export async function signIn(data) {
    const response = await fetch(`${url}/auth/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    try {
        const body = await validateResponse(response);
        return body;
    }
    catch (error) {
        throw error;
    }
}
export async function signUp(data) {
    const response = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    try {
        const body = await validateResponse(response);
        return body;
    }
    catch (error) {
        throw error;
    }
}
