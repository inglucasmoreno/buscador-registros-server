import { Injectable, NotFoundException } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class BusquedaService {

  async subirArchivo(): Promise<any> {

    const workbook = XLSX.readFile('./archivo/registros.xlsx');
    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel: any = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    
    // Verificacion de formato excel
    const condicion = dataExcel.length > 0 &&
                      dataExcel[0].dni &&
                      dataExcel[0].apellido_nombre &&
                      dataExcel[0].domicilio                  


    if(!condicion) throw new NotFoundException('Excel con formato incorrecto');

  }

  async busqueda(dni: string): Promise<any> {

    const workbook = XLSX.readFile('./archivo/registros.xlsx');
    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel: any = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    // Verificacion de formato excel
    const condicion = dataExcel.length > 0 &&
                      dataExcel[0].dni &&
                      dataExcel[0].apellido_nombre &&
                      dataExcel[0].domicilio                  

    if(!condicion) throw new NotFoundException('Excel con formato incorrecto');

    const registro = dataExcel.find( data => (String(data.dni).trim() === String(dni).trim()));

    return registro;

  }




}
