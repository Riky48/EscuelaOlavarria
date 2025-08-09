import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Director } from 'src/director/entities/director.entity';
import { Clase } from 'src/clase/entities/clase.entity';

@Entity('escuelas')
export class Escuela {
  @PrimaryGeneratedColumn()
  idEscuela: number;

  @Column()
  nombre: string;

  @Column()
  domicilio: string;
  
  @OneToOne(()=> Director)
  director: Director;

  @OneToMany(() => Clase, clase => clase.escuela) //relacion uno a muchos (lado 1)
  clases: Clase[];
  
}