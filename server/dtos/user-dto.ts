import { User } from "@prisma/client";

export class UserDto {
    id: string;
    email: string;
    isActivated: boolean;

    constructor(model: Omit<User, "activationLink" | "name" | "password">) {
        this.id = model.id;
        this.email = model.email;
        this.isActivated = model.isActivated;
    }
}
