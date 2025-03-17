import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique  } from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  declare fname: string;

  @Column
  declare lname: string;

  @Unique 
  @Column
  declare username: string;

  @Unique
  @Column
  declare email: string;

  @Column
  declare password: string;
}
