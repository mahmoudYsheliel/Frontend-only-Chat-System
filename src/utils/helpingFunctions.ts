import type { Message,MessageGroup } from "./models";

export function getDateTimeFormated() {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear();
    const currentDate = `${day}-${month}-${year}`
    const hours = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}`
    return { currentDate, currentTime }
}


export function extractFirstLink(text: string): string {
  const urlRegex = /(https?:\/\/[^\s]+)/;
  const match = text.match(urlRegex);
  return match ? match[0] : '';
}


export function groupMessagesByDate(messages: Message[]): MessageGroup[] {
    const groups: Record<string, Message[]> = {}

    for (const msg of messages) {
        if (!groups[msg.date]) {
            groups[msg.date] = []
        }
        groups[msg.date].push(msg)
    }
    return Object.keys(groups).map(date => ({
        date,
        messages: groups[date],
    }))
}