import { Application } from "express";
import notificationRoutes from "./notification.routes";
import eventRoutes from "./event.routes";

export default class Routes {
  constructor(app: Application) {
    // zabbix y wazuh notificaran por estas rutas
    app.use("/api/alert", notificationRoutes);
    // frontend de eventos solicitará los eventos en la DB por esta ruta
    app.use("/api/event", eventRoutes);
  }
}