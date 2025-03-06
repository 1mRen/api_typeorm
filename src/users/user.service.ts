import bcrypt from 'bcryptjs';
import { db } from '../_helpers/db';
import { User } from '../users/user.model';
import { Repository } from 'typeorm';

const userRepository: Repository<User> = db.getRepository(User);

export const userService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll(): Promise<User[]> {
  return await userRepository.find();
}

async function getById(id: number): Promise<User> {
  return await getUser(id);
}

interface CreateUserParams {
  email: string;
  password: string;
  username?: string;
  [key: string]: any;
}

async function create(params: CreateUserParams): Promise<void> {
  if (await userRepository.findOne({ where: { email: params.email } })) {
    throw new Error(`Email "${params.email}" is already registered`);
  }

  const user = userRepository.create(params);
  user.passwordHash = await bcrypt.hash(params.password, 10);
  await userRepository.save(user);
}

async function update(id: number, params: Partial<CreateUserParams>): Promise<void> {
  const user = await getUser(id);

  const usernameChanged = params.username && user.username !== params.username;
  if (usernameChanged && await userRepository.findOne({ where: { username: params.username } })) {
    throw new Error(`Username "${params.username}" is already taken`);
  }

  if (params.password) {
    params.passwordHash = await bcrypt.hash(params.password, 10);
  }

  Object.assign(user, params);
  await userRepository.save(user);
}

async function _delete(id: number): Promise<void> {
  const user = await getUser(id);
  await userRepository.remove(user);
}

async function getUser(id: number): Promise<User> {
  const user = await userRepository.findOne({ where: { id } });
  if (!user) throw new Error('User not found');
  return user;
}
