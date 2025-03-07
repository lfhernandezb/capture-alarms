import { Request, RequestHandler, Response } from "express";
import { doReceiveAlert } from "../services/do-receive-alert.service";
import { Alert } from "../model/alert.model";

export function welcome (req: Request, res: Response): void {
  res.json({ message: "Welcome to bezkoder application." });
}

export async function receiveAlert (req: Request, res: Response): Promise<void> {
  const alert: Alert = await doReceiveAlert(req.body);

  res.json({ message: "Ok." });
}