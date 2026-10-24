
import { User } from '../../domain/usermodel';

export abstract class IUsersRepository {
  abstract findByUsername(domainUser: User): Promise<User | null>;
  abstract create(domainUser: User): Promise<User>;
}