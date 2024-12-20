import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(password: string): Promise<boolean>;
}

export interface IMessage extends Document {
  content: string;
  author: string | IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAuthResponse {
  token: string;
  user: Omit<IUser, 'password'>;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterCredentials extends ILoginCredentials {
  username: string;
}
