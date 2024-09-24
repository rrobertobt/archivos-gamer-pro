import { Logger } from "@nestjs/common";

export abstract class BaseService {
  serviceName: string;
  logger: Logger;
  constructor(serviceName: string) {
    this.serviceName = serviceName;
    this.logger = new Logger(serviceName);
  }
}