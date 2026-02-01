export type Slot = { time: string; available: boolean };

const START_HOUR = 8;
const END_HOUR = 18;
const INTERVAL_MINUTES = 60;

export function generateSlotsForDate(date: string, bookedTimes: string[] = []): Slot[] {
  const slots: Slot[] = [];
  const baseDate = new Date(`${date}T00:00:00`);

  for (let hour = START_HOUR; hour < END_HOUR; hour++) {
    const slotDate = new Date(baseDate);
    slotDate.setHours(hour, 0, 0, 0);
    const time = slotDate.toTimeString().slice(0, 5);
    const available = !bookedTimes.includes(time);
    slots.push({ time, available });
  }

  return slots;
}
