import { Controller, Get, HttpStatus, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BusquedaService } from './busqueda.service';

@Controller('busqueda')
export class BusquedaController {

  constructor(private busquedaService: BusquedaService) { }

  // Busqueda de registro
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async busquedaRegistro(@Res() res, @Query() querys) {
    const { dni } = querys;
    const registro = await this.busquedaService.busqueda(dni);
    res.status(HttpStatus.OK).json({
      message: 'Busqueda de registro correcta',
      registro
    });
  }

  // Importacion de preguntas - Archivo excel (.xlsx)
  @UseInterceptors(
    FileInterceptor(
      'file',
      {
        storage: diskStorage({
          destination: './archivo',
          filename: function (req, file, cb) {
            cb(null, 'registros.xlsx')
          }
        })
      }
    )
  )
  @Post('/subir-archivo')
  async subirArchivo(@UploadedFile() file: Express.Multer.File) {

    const msg = await this.busquedaService.subirArchivo();

    return {
      msg
    }

  }


}
