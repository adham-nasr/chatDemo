import { CreateUserDto } from "../../in/dto/create-user.dto";
import { User }  from "../../../domain/usermodel"
import { IUser } from "./user";


export class UserMapper {

    static toPersistence(domainUser: User) {

        return {
            username: domainUser.username,
            password: domainUser.password
        }

    }

    static toDomain(dbUser: IUser | null) {
        if (!dbUser) return null;
        return new User(dbUser.username, dbUser.password, dbUser._id.toString());
    }
}