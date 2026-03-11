import { UserModel, IUser } from './user.model';
import { RegisterInput, LoginInput, UserPublic, AuthResponse } from './user.types';
import { hashPassword, comparePassword } from '../../utils/password';
import { generateAccessToken } from '../../utils/jwt';
import { AppError } from '../../middlewares/error.middleware';

function toPublic(user: IUser): UserPublic {
  return user.toJSON() as unknown as UserPublic;
}

export const userService = {
  async register(input: RegisterInput): Promise<AuthResponse> {
    const existing = await UserModel.findOne({
      $or: [{ email: input.email }, { mobile: input.mobile }],
    });
    if (existing) {
      const err = new Error(
        existing.email === input.email ? 'Email already registered' : 'Mobile already registered'
      ) as AppError;
      err.statusCode = 409;
      throw err;
    }
    const hashed = await hashPassword(input.password);
    const user = await UserModel.create({
      fullName: input.fullName,
      mobile: input.mobile,
      email: input.email,
      password: hashed,
    });
    const token = generateAccessToken({ userId: (user as IUser)._id.toString() });
    return { user: toPublic(user as IUser), token };
  },

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await UserModel.findOne({ email: input.email });
    if (!user) {
      const err = new Error('Invalid email or password') as AppError;
      err.statusCode = 401;
      throw err;
    }
    const match = await comparePassword(input.password, user.password);
    if (!match) {
      const err = new Error('Invalid email or password') as AppError;
      err.statusCode = 401;
      throw err;
    }
    const token = generateAccessToken({ userId: (user as IUser)._id.toString() });
    return { user: toPublic(user as IUser), token };
  },
};
