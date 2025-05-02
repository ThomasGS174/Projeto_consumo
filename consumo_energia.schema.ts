import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConsumoEnergiaDocument = ConsumoEnergia & Document;

@Schema()
export class ConsumoEnergia {
  @Prop({ required: true })
  usuario: string;

  @Prop({ required: true })
  quantidade_kwh: number;

  @Prop({ required: true })
  data_leitura: Date;
}

export const ConsumoEnergiaSchema = SchemaFactory.createForClass(ConsumoEnergia);
