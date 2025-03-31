import { Request, RequestHandler, Response } from "express";
import { processWazuhNotification } from "../services/process-wazuh-notification.service";
import { Notification } from "../model/wazuh/notification.model";

export function welcome (req: Request, res: Response): void {
  res.json({ message: "Welcome to bezkoder application." });
}

export async function receiveWazuhAlert (req: Request, res: Response): Promise<void> {
  try {
    console.log('Wazuh alert received');
    const notification: Notification = await processWazuhNotification(req.body);
    res.status(200).json({ message: "Ok." });
  } catch (error) {
    console.error('Error processing Wazuh alert:', error);
    res.status(500).json({ error: "Processing error" });    
  }
}
