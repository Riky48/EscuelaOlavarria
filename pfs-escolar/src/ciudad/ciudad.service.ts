import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CiudadDto } from './dto/create-ciudad.dto';
import { Ciudad } from './entities/ciudad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CiudadService {
  private ciudades: Ciudad[] = [];

  constructor(@InjectRepository(Ciudad)
  private readonly ciudadRepository: Repository<Ciudad>) { }

  /*  public async getAllRaw() : Promise<Ciudad[]> {
        let datos = await this.ciudadRepository.query("SELECT * FROM ciudades");
        
        datos.forEach(element => {
           // let ciudad : Ciudad = new Ciudad(element['idCiudad'], element['nombre']);
           let ciudad : Ciudad = new Ciudad(element['nombre']);
            this.ciudades.push(ciudad);
        });
        return this.ciudades;
    }*/
   
  public async getAll(): Promise<Ciudad[]> {
    let ciudades: Ciudad[] = await this.ciudadRepository.find();
    return ciudades;
  }

  //public async getById(id : number) : Promise<Ciudad|any> {
  //const criterio : FindOneOptions = { where: { idCiudad: id } }
  //let ciudad = await this.ciudadRepository.findOne( criterio );
  //if (ciudad)
  //    return ciudad;
  //}

  public async getById(id: number): Promise<Ciudad> {
    try {
      const criterio: FindOneOptions = { where: { idCiudad: id } }
      let ciudad: Ciudad|null = await this.ciudadRepository.findOne(criterio);
      if (ciudad) return ciudad;
      throw new NotFoundException('La ciudad no se encuentra');
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la busqueda de ciudad ' + id + ' : ' + error
      },
        HttpStatus.NOT_FOUND);
    }
  }

//POST
  public async addCiudad(ciudadDTO : CiudadDto) : Promise<Ciudad> {
    try {
       let ciudad : Ciudad = await this.ciudadRepository.save( new Ciudad(
           ciudadDTO.nombre
       ) );
       if (ciudad.getIdCiudad())
          return ciudad;
       else
          throw new NotFoundException('No se pudo crear la ciudad');
    } catch (error) {
          throw new HttpException( { status : HttpStatus.NOT_FOUND, 
                error : 'Error en la creacion de ciudad '+error}, HttpStatus.NOT_FOUND);
    }
 }

 //PUT (validar en DTO cuando se mandan atributos extra)
 public async updateCiudad(id: number, ciudadDTO: CiudadDto): Promise<Ciudad> {
  try {
    const criterio: FindOneOptions = { where: { idCiudad: id } };

    let ciudad: Ciudad | null = await this.ciudadRepository.findOne(criterio);

    if (!ciudad) {
      throw new NotFoundException('No se encuentra la ciudad');
    } else {
      ciudad.setNombre(ciudadDTO.nombre); // Método personalizado del modelo
      ciudad = await this.ciudadRepository.save(ciudad);
      return ciudad;
    }
  } catch (error) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la actualización de ciudad ' + error,
      },
      HttpStatus.NOT_FOUND
    );
  }
}

public async deleteCiudad(id : number) : Promise<boolean> {
  try {
    let criterio : FindOneOptions = { where: { idCiudad: id }}; //establezco un criterio
    let ciudad = await this.ciudadRepository.findOne(criterio); //busco para saber si la ciudad existe
    if (!ciudad)
      throw new NotFoundException('No se encuentra la ciudad');
    else
      await this.ciudadRepository.delete( ciudad.getIdCiudad() ); //la elimino por condicion id
    return true;
  } catch (error) {
    throw new HttpException( { status : HttpStatus.NOT_FOUND,
          error : 'Error en la eliminacion de ciudad '+error}, HttpStatus.NOT_FOUND);
  }
}

}