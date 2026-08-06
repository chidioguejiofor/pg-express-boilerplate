import { asValue } from "awilix";
import { container } from "../container";

export class SampleRepository {
  getSampleData() {
    return [];
  }
}

export const sampleRepository = new SampleRepository();

container.register({ sampleRepository: asValue(sampleRepository) });
