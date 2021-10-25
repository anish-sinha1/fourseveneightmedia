import { Injectable } from '@nestjs/common';

import { createHash } from 'crypto';

@Injectable()
export class UtilService {
  public createRandomHash(): string {
    console.log('here');
    const currentDate: string = new Date().valueOf().toString();
    const randomInt: string = Math.random().toString();
    const hash: string = createHash('sha256')
      .update(`${currentDate}-${randomInt}`)
      .digest('hex');
    console.log(hash);
    return hash;
  }
}
