export function getApiUrl(path) {
  const configuredUrl = process.env.APP_BASE_URL;
  const deploymentHost =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
      : process.env.VERCEL_URL;
  const fallbackPort =
    process.env.PORT || (process.env.NODE_ENV === "production" ? "3000" : "3100");
  const baseUrl =
    configuredUrl ||
    (deploymentHost
      ? `https://${deploymentHost}`
      : `http://localhost:${fallbackPort}`);

  return new URL(path, baseUrl).toString();
}
