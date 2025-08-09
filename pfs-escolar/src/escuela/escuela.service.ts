import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Escuela } from './entities/escuela.entity';

@Injectable()
export class EscuelaService {
  constructor(
    @InjectRepository(Escuela)
    private readonly escuelaRepository: Repository<Escuela>
  ) {}

  public async getAll(): Promise<Escuela[]> {
    const criterio: FindManyOptions<Escuela> = {  //obtenemos todas las escuelas con sus clases
      relations: ['clases'],
    };

    const escuelas: Escuela[] = await this.escuelaRepository.find(criterio);
    return escuelas;
  }

  
  public async getById(id: number): Promise<Escuela| null> {
    const criterio: FindOneOptions<Escuela> = { //obtenemos una escuela por id, con todas sus clases
      relations: ['clases'],
      where: { idEscuela: id },
    };

    const escuela: Escuela| null = await this.escuelaRepository.findOne(criterio);
    return escuela;
  }
}