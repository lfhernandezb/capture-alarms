import { Request, RequestHandler, Response } from "express";
import { processZabbixNotification } from "../services/process-zabbix-notification.service";

export function welcome (req: Request, res: Response): void {
  res.json({ message: "Welcome to bezkoder application." });
}

export async function receiveZabbixAlert (req: Request, res: Response): Promise<void> {
  try {
    console.log('Zabbix alert received');
    console.log(req.body);
    const notification: string = await processZabbixNotification(req.body);

    res.status(200).json({ message: "Ok." });    
  } catch (error) {
    console.error('Error processing Zabbix alert:', error);
    res.status(500).json({ error: "Processing error" });
    
  }
}