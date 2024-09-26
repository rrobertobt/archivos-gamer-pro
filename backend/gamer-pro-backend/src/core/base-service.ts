import { Logger } from '@nestjs/common';

export abstract class BaseService {
  serviceName: string;
  logger: Logger;
  constructor(serviceName: string) {
    this.serviceName = serviceName;
    this.logger = new Logger(serviceName);
  }

  normalizeString(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
