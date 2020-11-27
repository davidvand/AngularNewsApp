import { Role } from './role.model';

export class User {
    userID: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    roleID: number;
    role: Role;
}