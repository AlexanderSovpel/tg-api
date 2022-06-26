import { DynamicModule, Module } from "@nestjs/common";

import { TG_API_TOKEN } from "./tgApi.constants";
import { TgApiService } from "./tgApi.service";


@Module({})
export class TgApiModule {
  static register(token: string): DynamicModule {
    return {
      module: TgApiModule,
      providers: [
        {
          provide: TG_API_TOKEN,
          useValue: token,
        },
        TgApiService,
      ],
      exports: [TgApiService],
    };
  }
}
