import { hashPasssword, verifyPassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
import { UserRepository } from '../repositories/user.repository.js';

const userRepository = new UserRepository();

export const registerUserService = async (data: { username: string; password: string }) => {
  const existingUser = await userRepository.findByUsername(data.username);
  if (existingUser) {
    throw new Error('Username is already taken');
  }

  const hashedPassword = await hashPasssword(data.password);
  
  const user = await userRepository.createUser({
    username: data.username,
    password: hashedPassword,
  });

  const token = generateToken({ userId: user._id.toString(), username: user.username });

  return { token, user: { id: user._id, username: user.username } };
};

export const loginUserService = async (data: { username: string; password: string }) => {
  const user = await userRepository.findByUsername(data.username);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await verifyPassword(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ userId: user._id.toString(), username: user.username });

  return { token, user: { id: user._id, username: user.username } };
};
