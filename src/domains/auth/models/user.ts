import { DataTypes, Optional } from "sequelize";
import bcrypt from "bcryptjs";
import { sequelize } from "infrastructure/db";
import { BaseModel, baseModelAttributes } from "shared/base-model";
import { UserEntity } from "../entities";

type UserCreationAttributes = Optional<
  UserEntity,
  "id" | "createdAt" | "updatedAt" | "emailIsVerified"
>;

export class User extends BaseModel<UserEntity, UserCreationAttributes> {
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare emailIsVerified: boolean;
  declare gender?: string;
  declare dob?: Date;

  static generateHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  isPasswordValid(unhashedPassword: string) {
    return bcrypt.compareSync(unhashedPassword, this.password);
  }
}

User.init(
  {
    ...baseModelAttributes,
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailIsVerified: {
      type: DataTypes.STRING,
      defaultValue: false,
      field: "email_is_verified",
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user",
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: {
        attributes: { include: ["password"] },
      },
    },
  }
);
