import type { AdminNewUser, AdminUsersRequest, User } from "@/types/admin.types";
export declare function fetchUsers(data: AdminUsersRequest): Promise<User[]>;
export declare function createUser(data: AdminNewUser & {
    token: string;
}): Promise<void>;
export declare function modifyUser(data: Partial<AdminNewUser> & {
    token: string;
    id: string;
}): Promise<void>;
export declare function deleteUser(data: {
    token: string;
    id: string;
}): Promise<void>;
