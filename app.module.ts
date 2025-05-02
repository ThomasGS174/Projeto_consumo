import { MongooseModule } from '@nestjs/mongoose';
import { ConsumoEnergiaModule } from './consumo_energia/consumo_energia.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/consumo_db'),
    ConsumoEnergiaModule,
  ],
})
export class AppModule {}