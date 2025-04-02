import {
  getEventById,
  getEventByOriginAndEventId,
  getAllEventsByOrigin,
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../services/event.service";
import {
  createInfraEvent,
  deleteInfraEvent,
  getAllInfraEvents,
  getInfraEventByOriginAndEventId,
  getInfraEventById,
  getAllInfraEventsByOrigin,
  updateInfraEvent,
} from "../repositories/infra-event.repository";
import { InfraEvent } from "../model/infra-event.model";

jest.mock("../repositories/infra-event.repository");

describe("Event Service", () => {
  const mockInfraEvent: Partial<InfraEvent> = {
    id: 1,
    origin: "test-origin",
    eventid: "test-event-id",
    equipmentId: 1,
    description: "Test event",
    status: "active",
    acknowledged: false,
    severity: "high",
    timestamp: new Date(),
    detail: "Test detail",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getEventById", () => {
    it("should return an event by ID", async () => {
      (getInfraEventById as jest.Mock).mockResolvedValue(mockInfraEvent);

      const result = await getEventById(1);

      expect(getInfraEventById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockInfraEvent);
    });

    it("should throw an error if the event is not found", async () => {
      (getInfraEventById as jest.Mock).mockResolvedValue(null);

      await expect(getEventById(1)).rejects.toThrow("Event not found");
    });
  });

  describe("getEventByOriginAndEventId", () => {
    it("should return an event by origin and event ID", async () => {
      (getInfraEventByOriginAndEventId as jest.Mock).mockResolvedValue(mockInfraEvent);

      const result = await getEventByOriginAndEventId("test-origin", "test-event-id");

      expect(getInfraEventByOriginAndEventId).toHaveBeenCalledWith("test-origin", "test-event-id");
      expect(result).toEqual(mockInfraEvent);
    });

    it("should throw an error if the event is not found", async () => {
      (getInfraEventByOriginAndEventId as jest.Mock).mockResolvedValue(null);

      await expect(getEventByOriginAndEventId("test-origin", "test-event-id")).rejects.toThrow(
        "Event not found"
      );
    });
  });

  describe("getAllEventsByOrigin", () => {
    it("should return all events by origin", async () => {
      (getAllInfraEventsByOrigin as jest.Mock).mockResolvedValue([mockInfraEvent]);

      const result = await getAllEventsByOrigin("test-origin");

      expect(getAllInfraEventsByOrigin).toHaveBeenCalledWith("test-origin");
      expect(result).toEqual([mockInfraEvent]);
    });

    it("should throw an error if no events are found", async () => {
      (getAllInfraEventsByOrigin as jest.Mock).mockResolvedValue(null);

      await expect(getAllEventsByOrigin("test-origin")).rejects.toThrow("Event not found");
    });
  });

  describe("getAllEvents", () => {
    it("should return all events", async () => {
      (getAllInfraEvents as jest.Mock).mockResolvedValue([mockInfraEvent]);

      const result = await getAllEvents();

      expect(getAllInfraEvents).toHaveBeenCalled();
      expect(result).toEqual([mockInfraEvent]);
    });
  });

  describe("createEvent", () => {
    it("should create a new event", async () => {
      (createInfraEvent as jest.Mock).mockResolvedValue(mockInfraEvent);

      const result = await createEvent(mockInfraEvent);

      expect(createInfraEvent).toHaveBeenCalledWith(mockInfraEvent);
      expect(result).toEqual(mockInfraEvent);
    });
  });

  describe("updateEvent", () => {
    it("should update an existing event", async () => {
      (updateInfraEvent as jest.Mock).mockResolvedValue(mockInfraEvent);

      const result = await updateEvent(1, mockInfraEvent);

      expect(updateInfraEvent).toHaveBeenCalledWith(1, mockInfraEvent);
      expect(result).toEqual(mockInfraEvent);
    });

    it("should throw an error if the event is not found", async () => {
      (updateInfraEvent as jest.Mock).mockResolvedValue(null);

      await expect(updateEvent(1, mockInfraEvent)).rejects.toThrow("Event not found");
    });
  });

  describe("deleteEvent", () => {
    it("should delete an event", async () => {
      (deleteInfraEvent as jest.Mock).mockResolvedValue(mockInfraEvent);

      const result = await deleteEvent(1);

      expect(deleteInfraEvent).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockInfraEvent);
    });

    it("should throw an error if the event is not found", async () => {
      (deleteInfraEvent as jest.Mock).mockResolvedValue(null);

      await expect(deleteEvent(1)).rejects.toThrow("Event not found");
    });
  });
});