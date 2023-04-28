export const urlEncode = (data: Object): string => Object.entries(data)
  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
  .join('&')
