export const formatDate = (value?: string | Date, fallback = '—') => {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toLocaleDateString();
};

export const formatNumber = (value: number | string, fallback = '0') => {
  const number = Number(value);
  return Number.isFinite(number) ? number.toLocaleString() : fallback;
};

export const isRequired = (value: unknown) => value !== undefined && value !== null && String(value).trim() !== '';

export const toTitleCase = (value: string) => value.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
