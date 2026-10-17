import { hashPasssword, verifyPassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

export const registerUserService = async (data: { username: string; password: string }) => {
  // TODO: Call auth repository when implemented
  const hashedPassword = await hashPasssword(data.password);
  
  // Dummy created user
  const user = {
    _id: 'dummy_user_id',
    username: data.username,
    password: hashedPassword,
  };

  const token = generateToken({ userId: user._id, username: user.username });

  return { token, user: { id: user._id, username: user.username } };
};

export const loginUserService = async (data: { username: string; password: string }) => {
  // TODO: Call auth repository when implemented
  // Dummy user lookup & verification check
  const dummyStoredHash = await hashPasssword(data.password);
  const isPasswordValid = await verifyPassword(data.password, dummyStoredHash);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const user = {
    _id: 'dummy_user_id',
    username: data.username,
  };

  const token = generateToken({ userId: user._id, username: user.username });

  return { token, user: { id: user._id, username: user.username } };
};
