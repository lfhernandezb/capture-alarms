import "reflect-metadata";
import { processWazuhNotification } from "../services/process-wazuh-notification.service";
import { Request, Response } from "express";
import { Notification } from "../model/wazuh/notification.model";
import { receiveWazuhAlert } from "../controllers/wazuh.controller";

jest.mock("../services/process-wazuh-notification.service");

describe("receiveWazuhAlert", () => {
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
    const mockNotification: Notification = { 
        attachments: [
            { color: "#36a64f", pretext: "Test Pretext", title: "Test Title", text: "Test Text", fields: [{ title: "Field Title", value: "Field Value" }], ts: "1234567890" }   
        ] 
    };

    (processWazuhNotification as jest.Mock).mockResolvedValue(mockNotification);

    await receiveWazuhAlert(mockRequest as Request, mockResponse as Response);

    expect(processWazuhNotification).toHaveBeenCalledWith(mockRequest.body);
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({ message: "Ok." });
  });

  test("should handle errors from processWazuhNotification", async () => {
    (processWazuhNotification as jest.Mock).mockRejectedValue(new Error("Processing error"));

    await receiveWazuhAlert(mockRequest as Request, mockResponse as Response);

    expect(processWazuhNotification).toHaveBeenCalledWith(mockRequest.body);
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ error: "Processing error" });
  });
});