import type{ EventType } from "./models";
type EventHandler = (payload?: any) => void;

class EventBus {
  private events: Record<EventType, EventHandler[]> = {
    new_message: [],
    new_user: [],
    select_chat: [],
    user_data: []
  };

  on(event: EventType, handler: EventHandler) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  off(event: EventType, handler: EventHandler) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(h => h !== handler);
  }

  emit(event: EventType, payload?: any) {
    if (!this.events[event]) return;
    this.events[event].forEach(handler => handler(payload));
  }
}

export const eventBus = new EventBus();
