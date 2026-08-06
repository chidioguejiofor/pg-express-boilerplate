import { SampleRepository } from "../repositories";

export class SampleGetDataUsecase {
  constructor(private sampleRepository: SampleRepository) {}

  async execute() {
    return this.sampleRepository.getSampleData();
  }
}
