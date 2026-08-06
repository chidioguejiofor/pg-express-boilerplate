import { asClass } from "awilix";
import { SampleGetDataUsecase } from "./GetSampleDataUsecase";
import { container } from "../container";
import "../repositories"; // ensures sampleRepository is registered before we resolve below

container.register({
  getSampleDataUsecase: asClass(SampleGetDataUsecase),
});

export const getSampleDataUsecase = container.resolve<SampleGetDataUsecase>(
  "getSampleDataUsecase"
);
