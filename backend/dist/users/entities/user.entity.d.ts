import type { Role } from "../../types/UsersTypes";
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
