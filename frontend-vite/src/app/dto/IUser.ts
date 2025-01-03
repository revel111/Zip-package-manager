import {IRole} from "./IRole.ts";

export interface IUser {
    id: number;
    email: string;
    nickname: string;
    roles: IRole[];
}