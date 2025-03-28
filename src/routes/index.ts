import { Application } from "express";
import notificationRoutes from "./notification.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", notificationRoutes);
  }
}