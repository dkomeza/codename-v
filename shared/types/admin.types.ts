export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  type: "ADMIN" | "COORDINATOR" | "VOLUNTEER";
};

export type Organization = {
  id: string;
  organizationName: string;
};

export type AdminUsersRequest = {
  page: number;
  limit: number;
  token: string;
};
