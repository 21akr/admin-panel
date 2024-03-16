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

  async hash(): Promise<string> {
    const saltRounds = 5;
    const salt = await genSalt(saltRounds);
    this._hash = await hash(this._password, salt);
    return this._hash;
  }

  async compare(): Promise<boolean> {
    return await compare(this._password, this._hash);
  }

  async newPassword() {
    return crypto
      .randomBytes(Math.ceil(16 / 2))
      .toString('hex')
      .slice(0, 12);
  }
}
