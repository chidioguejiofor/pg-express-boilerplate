import { asValue } from "awilix";
import { container } from "../container";

export class ExampleRepository {
  getSampleData() {
    return [];
  }
}

export const exampleRepository = new ExampleRepository();

container.register({ exampleRepository: asValue(exampleRepository) });
