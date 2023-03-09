import { Module } from '@nestjs/common';
import { BusquedaController } from './busqueda.controller';
import { BusquedaService } from './busqueda.service';

@Module({
  controllers: [BusquedaController],
  providers: [BusquedaService]
})
export class BusquedaModule {}
