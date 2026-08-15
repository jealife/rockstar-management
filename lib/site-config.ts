// No confirmed domain yet — falls back to a placeholder so sitemap/robots
// generate valid absolute URLs during dev. Set NEXT_PUBLIC_SITE_URL once a
// domain is bought.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rockstar-management.com";
