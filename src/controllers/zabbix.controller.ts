import { Request, RequestHandler, Response } from "express";
import { processZabbixNotification } from "../services/process-zabbix-notification.service";

export function welcome (req: Request, res: Response): void {
  res.json({ message: "Welcome to bezkoder application." });
}

export async function receiveZabbixAlert (req: Request, res: Response): Promise<void> {
  console.log('Zabbix alert received');
  console.log(req.body);
  const notification: string = await processZabbixNotification(req.body);

  res.status(200).json({ message: "Ok." });
}