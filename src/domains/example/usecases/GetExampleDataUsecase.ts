import { ExampleRepository } from "../repositories";
import { IAuthAPI } from "domains/auth";

export class GetExampleDataUsecase {
  constructor(
    private exampleRepository: ExampleRepository,
    private authAPI: IAuthAPI
  ) {}

  async execute(token: string) {
    const decodedToken = this.authAPI.decodeAccessToken(token);

    return {
      items: this.exampleRepository.getSampleData(),
      requestedBy: decodedToken.email,
    };
  }
}
