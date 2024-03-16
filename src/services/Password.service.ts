import { compare, genSalt, hash } from 'bcrypt';
import crypto from 'crypto';

export class PasswordService {
  private _password: string;
  private _hash: string;

  buildPassword(value: string): PasswordService {
    this._password = value;
    return this;
  }

  buildHash(value: string): PasswordService {
    this._hash = value;
    return this;
  }

  getHash(): string {
    return this._hash;
  }

  getPassword(): string {
    return this._password;
  }

  async hash(_password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    this._hash = await hash(_password, salt);
    return this._hash;
  }

  async compare(_password: string, _hash: string): Promise<boolean> {
    return await compare(_password, _hash);
  }

  async newPassword(): Promise<string> {
    return crypto
      .randomBytes(Math.ceil(16 / 2))
      .toString('hex')
      .slice(0, 12);
  }
}
