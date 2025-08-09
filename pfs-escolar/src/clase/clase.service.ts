import { Injectable } from '@nestjs/common';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { Clase } from './entities/clase.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClaseService {

    constructor(@InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>) { }

    
    public async getAll() : Promise<Clase[]> {
      
        let criterio : FindManyOptions = { relations: [ 'estudiantes' ] }
        let clases: Clase[] = await this.claseRepository.find( criterio );
        return clases ;
      
    }

    public async getById(id : number) : Promise<Clase | null> {
    
        let criterio : FindOneOptions = { relations: [ 'estudiantes' ], where: { idClase: id } }
        let clase: Clase | null= await this.claseRepository.findOne( criterio );
        return clase;

    }
  

  create(createClaseDto: CreateClaseDto) {
    return 'This action adds a new clase';
  }

  findAll() {
    return `This action returns all clase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clase`;
  }

  update(id: number, updateClaseDto: UpdateClaseDto) {
    return `This action updates a #${id} clase`;
  }

  remove(id: number) {
    return `This action removes a #${id} clase`;
  }
}