import mongoose from 'mongoose';

export interface RegisterInput {
  fullName: string;
  mobile: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserPublic {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  mobile: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  user: UserPublic;
  token: string;
}
