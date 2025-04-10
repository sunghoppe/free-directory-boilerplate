import { env } from "@/env.mjs";
import { SiteConfig } from "types";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const enSiteConfig: SiteConfig = {
  name: "NISOO",
  title: "NISOO - Discover Top Products for Efficient",
  description:
    "NISOO - Discover Top Products for Efficient",
  url: site_url,
  ogImage: `${site_url}/og.png`,
  mailSupport: "admin@nisoo.com",
  creator: "javayhu",
  subtitle: "NISOO - Discover Top Products for Efficient",
};

const zhSiteConfig: SiteConfig = {
  name: "NISOO",
  title: "NISOO - Discover Top Products for Efficient",
  description:
    "NISOO - Discover Top Products for Efficient",
  url: site_url,
  ogImage: `${site_url}/og.png`,
  mailSupport: "admin@nisoo.com",
  creator: "javayhu",
  subtitle: "NISOO - Discover Top Products for Efficient",
};

export const AllSiteConfigs: {[key: string]: SiteConfig} = {
  en: enSiteConfig,
  zh: zhSiteConfig,
}