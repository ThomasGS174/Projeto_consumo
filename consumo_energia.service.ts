import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsumoEnergia, ConsumoEnergiaDocument } from './consumo_energia.schema';
import { CreateConsumoDto } from './dto/create-consumo.dto';

@Injectable()
export class ConsumoEnergiaService {
  constructor(
    @InjectModel(ConsumoEnergia.name)
    private readonly model: Model<ConsumoEnergiaDocument>
  ) {}

  async registrar(data: CreateConsumoDto): Promise<ConsumoEnergia> {
    return new this.model(data).save();
  }

  async consultar(usuario: string, inicio: Date, fim: Date) {
    return this.model.find({
      usuario,
      data_leitura: { $gte: inicio, $lte: fim },
    });
  }

  async alerta(usuario: string) {
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    const inicioAtual = new Date(anoAtual, mesAtual, 1);
    const fimAtual = new Date(anoAtual, mesAtual + 1, 0);

    const inicioAntigo = new Date(anoAtual, mesAtual - 2, 1);

    const registrosAntigos = await this.model.find({
      usuario,
      data_leitura: { $gte: inicioAntigo, $lt: inicioAtual },
    });

    const registrosAtuais = await this.model.find({
      usuario,
      data_leitura: { $gte: inicioAtual, $lte: fimAtual },
    });

    const media = registrosAntigos.reduce((s, r) => s + r.quantidade_kwh, 0) / 2;
    const totalAtual = registrosAtuais.reduce((s, r) => s + r.quantidade_kwh, 0);

    return {
      alerta: totalAtual > 2 * media,
      media_anterior: media,
      consumo_atual: totalAtual,
    };
  }
}