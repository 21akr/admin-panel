import { JwtPayload, sign, verify } from 'jsonwebtoken';
import moment from 'moment';

export class TokenService {
  protected _secret: string;
  protected _expiresIn: number;
  protected _payload: string | JwtPayload;
  protected _TokenService: string;

  constructor(secret: string, expiresIn: number, payload: object = {}) {
    this.buildSecret(secret);
    this.buildExpiresIn(expiresIn);
    this.buildPayload(payload);
  }

  buildSecret(value: string): TokenService {
    this._secret = value;
    return this;
  }

  buildExpiresIn(value: number): TokenService {
    this._expiresIn = value;
    return this;
  }

  buildPayload(value: any): TokenService {
    this._payload = {
      ...value,
      ...{ generatedAt: moment().toDate().getMilliseconds() },
    };
    return this;
  }

  buildTokenService(value: string): TokenService {
    this._TokenService = value;
    return this;
  }

  getSecret(): string {
    return this._secret;
  }

  getExpiresIn(): number {
    return this._expiresIn;
  }

  getPayload(): string | JwtPayload {
    return this._payload;
  }

  getTokenService(): string {
    return this._TokenService;
  }

  sign(): string {
    this._TokenService = sign(this.getPayload(), this.getSecret(), {
      expiresIn: this.getExpiresIn(),
    });
    return this.getTokenService();
  }

  verify(): string | JwtPayload {
    this._payload = verify(this.getTokenService(), this.getSecret());
    return this.getPayload();
  }
}
