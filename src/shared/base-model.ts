import { v4 } from "uuid";
import {
  Column,
  Model,
  Default,
  CreatedAt,
  UpdatedAt,
  DataType,
} from "sequelize-typescript";
import { BaseEntity } from "./base-entity";

export class BaseModel<T extends BaseEntity> extends Model<T> {
  @Default(v4)
  @Column({ primaryKey: true, type: DataType.STRING })
  id: string;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt: Date;
}
