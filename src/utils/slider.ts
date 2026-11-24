export function clampPercentage(value: number): number {
  if (!Number.isFinite(value)) {
    return 50;
  }
  return Math.min(100, Math.max(0, Math.round(value * 10) / 10));
}

export function calculateSliderPercentage(
  clientX: number,
  rectLeft: number,
  rectWidth: number
): number {
  if (!Number.isFinite(rectWidth) || rectWidth <= 0) {
    return 50;
  }
  const raw = ((clientX - rectLeft) / rectWidth) * 100;
  return clampPercentage(raw);
}

export function stepSliderPercentage(current: number, delta: number): number {
  return clampPercentage(current + delta);
}
