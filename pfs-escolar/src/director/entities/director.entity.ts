import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Escuela } from 'src/escuela/entities/escuela.entity';

@Entity('director')
export class Director {
  @PrimaryGeneratedColumn()
  idDirector: number;

  @Column({ length: 100 })
  nombre: string;

  @OneToOne(() => Escuela) // se pasa como parametro una funcion anonima que devuelve un objeto del tipo al que se lo relaciona
  @JoinColumn()  //esto indica que esta entidad es la que tiene la foreing key
  escuela: Escuela;
}