import { DataTypes, Model, ModelAttributes } from "sequelize";
import { v4 } from "uuid";
import { BaseEntity } from "./base-entity";

export class BaseModel<
  TAttributes extends BaseEntity,
  TCreationAttributes extends {} = TAttributes
> extends Model<TAttributes, TCreationAttributes> {
  declare id: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

// Spread into every concrete model's own `.init()` call - Model.init() has no
// inheritance mechanism for column definitions the way decorators did, so
// this is how id/createdAt/updatedAt stay shared across models.
export const baseModelAttributes: ModelAttributes<Model> = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: v4,
  },
  createdAt: {
    field: "created_at",
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: "updated_at",
    type: DataTypes.DATE,
  },
};
