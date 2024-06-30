import { MailTransport } from "../mail";
import { NotificationTransport } from "../types/notification-types";

const transport: NotificationTransport[] = [];

export const createNotificationTransport = (
  type: "mail" | "sms",
): NotificationTransport => {
  switch (type) {
    case "mail": {
      const requiredTransportCache = transport.find(
        (transport) => transport instanceof MailTransport,
      );
      if (requiredTransportCache) requiredTransportCache;
      const instance = new MailTransport();
      transport.push(instance);
      return instance;
    }
    case "sms":
      throw new Error("Sms notification is not supported");
    default:
      throw new Error(`${type} notification provider is not supported`);
  }
};
