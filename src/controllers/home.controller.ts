import { Request, RequestHandler, Response } from "express";
import { doReceiveAlert } from "../services/do-receive-alert.service";
import { Alert } from "../model/alert.model";

export function welcome (req: Request, res: Response): void {
  res.json({ message: "Welcome to bezkoder application." });
}

export async function receiveWazuhAlert (req: Request, res: Response): Promise<void> {
  console.log('Wazuh alert received');
  const alert: Alert = await doReceiveAlert(req.body);

  res.status(200).json({ message: "Ok." });
}

export async function receiveZabbixAlert (req: Request, res: Response): Promise<void> {
  console.log('Zabbix alert received');
  console.log(req.body);

  res.status(200).json({ message: "Ok." });
}