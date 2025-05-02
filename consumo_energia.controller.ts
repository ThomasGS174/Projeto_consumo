import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ConsumoEnergiaService } from './consumo_energia.service';
import { CreateConsumoDto } from './dto/create-consumo.dto';

@Controller('consumo')
export class ConsumoEnergiaController {
  constructor(private readonly service: ConsumoEnergiaService) {}

  @Post()
  criar(@Body() dto: CreateConsumoDto) {
    return this.service.registrar(dto);
  }

  @Get('historico')
  historico(
    @Query('usuario') usuario: string,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
  ) {
    return this.service.consultar(usuario, new Date(dataInicio), new Date(dataFim));
  }

  @Get('alerta')
  alerta(@Query('usuario') usuario: string) {
    return this.service.alerta(usuario);
  }
}