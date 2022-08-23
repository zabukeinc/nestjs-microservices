import { JubelioService } from "@hope-module/data/services/jubelio.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HopeOrchestrator {
  constructor(protected readonly jubelioService: JubelioService) {}

  async login(): Promise<void> {
    const req = await this.jubelioService.login();

    console.log(req);
  }
}