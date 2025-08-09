import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadDto } from './dto/create-ciudad.dto';
import { Ciudad } from './entities/ciudad.entity';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Post()
  async crearCiudad(@Body() ciudad: CiudadDto): Promise<Ciudad> {
    return this.ciudadService.addCiudad(ciudad);
  }

  @Put(':id')
  async actualizarCiudad(
    @Param('id') id: number,
    @Body() ciudad: CiudadDto
  ): Promise<Ciudad> {
    return this.ciudadService.updateCiudad(id, ciudad);
  }

  @Get()
  async obtenerTodas(): Promise<Ciudad[]> {
    return this.ciudadService.getAll();
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: number): Promise<Ciudad> {
    return this.ciudadService.getById(id);
  }


  @Delete(':id')
  async eliminarCiudad(@Param('id') id: number): Promise<boolean> {
    return this.ciudadService.deleteCiudad(id);
  }
}