import { randomInt } from 'crypto';

export class UtilityService {
  static generateConfirmationCode(): number {
    return randomInt(100000, 999999);
  }
}
