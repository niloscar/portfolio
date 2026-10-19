const BOT_PATTERN = /googlebot|google-inspectiontool|bingbot|duckduckbot|baiduspider|yandexbot|slurp|facebookexternalhit|twitterbot|linkedinbot|bytespider|headlesschrome/i

export function isBot(userAgent: string | undefined): boolean {
  return BOT_PATTERN.test(userAgent ?? '')
}
