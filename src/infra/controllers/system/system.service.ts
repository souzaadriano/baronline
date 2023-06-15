import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemService {
  healthCheck() {
    return {
      status: true,
      issuedAt: new Date(),
    };
  }
}
