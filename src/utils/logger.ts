/**
 * The one place errors are reported. Swap the body for an error-tracking service (Sentry,
 * Datadog…) and every caller is covered.
 */
export function logError(context: string, error: unknown): void {
  console.error(`[${context}]`, error);
}
