import { User } from "../../database/models/User";
import { CreationAttributes } from 'sequelize';
interface CreateUserInput {
  email: string;
  password: string;
}

export async function CreateUser(input: CreationAttributes<User>) {
  const user = await User.create(input);
  return user;
}