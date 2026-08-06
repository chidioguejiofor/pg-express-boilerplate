import { Table, Column, Model } from "sequelize-typescript";

@Table
export class ExampleModel extends Model {
  @Column
  name: string;

  @Column
  birthday: Date;
}
