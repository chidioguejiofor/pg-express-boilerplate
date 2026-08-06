import { Request, Response } from "express";
import { getExampleDataUsecase } from "../usecases";
import { handleErrors } from "shared/utils";

export class ExampleController {
  static async getExampleData(req: Request, res: Response) {
    try {
      const token = (req.query.token as string) || "";
      const resData = await getExampleDataUsecase.execute(token);

      return res.status(200).json(resData);
    } catch (error) {
      return handleErrors(res, error as Error);
    }
  }
}
