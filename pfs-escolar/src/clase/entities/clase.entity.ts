import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Escuela } from 'src/escuela/entities/escuela.entity';

@Entity('clases')
export class Clase {
  @PrimaryGeneratedColumn()
  idClase: number;

  @Column({ length: 45 })
  nombre: string;

  @ManyToOne(() => Escuela, escuela => escuela.clases)
  @JoinColumn() // usamos el join en la tabla que se tiene la fk real
  escuela: Escuela;
}