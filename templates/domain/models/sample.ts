import { DataTypes, Model } from "sequelize";
import { sequelize } from "infrastructure/db";

export class SampleModel extends Model {
  declare name: string;
  declare birthday: Date;
}

SampleModel.init(
  {
    name: { type: DataTypes.STRING },
    birthday: { type: DataTypes.DATE },
  },
  { sequelize }
);
