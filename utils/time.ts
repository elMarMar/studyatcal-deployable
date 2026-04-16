export function numberToTimeInput(value: number | null): string {
  if (value === null) return "";
  const hours = Math.floor(value);
  const minutes = Math.round((value - hours) * 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function timeInputToNumber(value: string): number | null {
  if (!value) return null;
  const [hours, minutes] = value.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours + minutes / 60;
}

export function parseTimeToNumber(value: number | string | null | undefined): number {
  if (value === null || value === undefined) {
    return Number.NaN;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : Number.NaN;
  }

  const [hours, minutes] = value.split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return Number.NaN;
  }

  return hours + minutes / 60;
}

export function isOpenNow(
  openTime: number | string | null | undefined,
  closeTime: number | string | null | undefined,
  now: Date = new Date(),
): boolean {
  const open = parseTimeToNumber(openTime);
  const close = parseTimeToNumber(closeTime);

  if (!Number.isFinite(open) || !Number.isFinite(close)) {
    return false;
  }

  const currentTime = now.getHours() + now.getMinutes() / 60;

  if (close > open) {
    return currentTime >= open && currentTime < close;
  }

  return currentTime >= open || currentTime < close;
}
