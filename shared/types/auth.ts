export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type SignUpData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  birthDate: Date;
  school: string;
};
