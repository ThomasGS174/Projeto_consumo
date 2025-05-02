import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'OBA!!! A API de consumo de energia está rodando!';
  }
}