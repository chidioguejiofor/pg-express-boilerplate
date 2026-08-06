import { DataTypes, Model } from "sequelize";
import { sequelize } from "infrastructure/db";

export class ExampleModel extends Model {
  declare name: string;
  declare birthday: Date;
}

ExampleModel.init(
  {
    name: { type: DataTypes.STRING },
    birthday: { type: DataTypes.DATE },
  },
  { sequelize }
);
