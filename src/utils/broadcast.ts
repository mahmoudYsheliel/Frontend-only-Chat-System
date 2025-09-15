import { eventBus } from "./eventBus";
import type {EventType} from "./models";

const channel = new BroadcastChannel("chat_channel");

channel.onmessage = (event: MessageEvent) => {
  const { type, payload } = event.data as { type: EventType; payload: any };
  eventBus.emit(type, payload);
};

export function broadcast(type: EventType, payload?: any) {
  eventBus.emit(type, payload);
  channel.postMessage({ type, payload });
}
