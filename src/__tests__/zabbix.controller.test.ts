import "reflect-metadata";
import { processZabbixNotification } from "../services/process-zabbix-notification.service";
import { Request, Response } from "express";
import { receiveZabbixAlert } from "../controllers/zabbix.controller";

jest.mock("../services/process-zabbix-notification.service");

describe("receiveZabbixAlert", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockStatus: jest.Mock;
  let mockJson: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn(() => ({ json: mockJson }));
    mockRequest = {
      body: { alert: "test alert" },
    };
    mockResponse = {
      status: mockStatus,
    };
    jest.clearAllMocks();
  });

  test("should process the notification and return a 200 response", async () => {
    (processZabbixNotification as jest.Mock).mockResolvedValue("Notification processed");

    await receiveZabbixAlert(mockRequest as Request, mockResponse as Response);

    expect(processZabbixNotification).toHaveBeenCalledWith(mockRequest.body);
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({ message: "Ok." });
  });

  test("should handle errors from processZabbixNotification", async () => {
    (processZabbixNotification as jest.Mock).mockRejectedValue(new Error("Processing error"));

    await receiveZabbixAlert(mockRequest as Request, mockResponse as Response);

    expect(processZabbixNotification).toHaveBeenCalledWith(mockRequest.body);
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ error: "Processing error" });
  });
});