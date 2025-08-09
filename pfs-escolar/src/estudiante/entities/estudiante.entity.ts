import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Estudiante {
   @PrimaryColumn()
   private idEscuela: number;

   @Column()
   private apellidoNombres: string;

   @Column()
   private fechaNacimiento: string;
   
   @ManyToMany(type => Clase)
   @JoinTable()
   public clases : Clase[];
}