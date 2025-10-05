import type { AuthToken, LoginData, SignUpData, AuthToken as Token, User } from "@/types/auth";
export declare function authenticate(data: AuthToken): Promise<User>;
export declare function signIn(data: LoginData): Promise<Token>;
export declare function signUp(data: SignUpData): Promise<Token>;
