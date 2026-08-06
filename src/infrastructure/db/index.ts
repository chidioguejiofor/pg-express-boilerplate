import { Sequelize } from "sequelize";
import { SEQUELIZE_CONFIG } from "../settings";

// Plain sequelize has no "models" registration array like sequelize-typescript
// did - each model self-registers by calling Model.init({...}, { sequelize })
// in its own file, triggered whenever something imports that model.
export const sequelize = new Sequelize({
  ...SEQUELIZE_CONFIG,
  dialect: "postgres",
});
