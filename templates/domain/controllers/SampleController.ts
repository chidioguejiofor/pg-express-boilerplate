import { Request, Response } from "express";
import { getSampleDataUsecase } from "../usecases";

export class SampleController {
  static async getSampleData(req: Request, res: Response) {
    const resData = await getSampleDataUsecase.execute();

    return res.status(200).json(resData);
  }
}
