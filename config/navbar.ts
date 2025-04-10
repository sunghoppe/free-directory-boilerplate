import { NavConfig } from "types";

const enNavConfig: NavConfig = {
  mainNav: [
    {
      title: "Products",
      href: "/group/ai-site",
      path: "/group/",
    },
    {
      title: "Apps",
      href: "/apptype/new",
      path: "/apptype/",
    },
    {
      title: "Blog",
      href: "/blog",
      path: "/blog",
    },
  ],
}

const zhNavConfig: NavConfig = {
  mainNav: [
    {
      title: "工具",
      href: "/group/ai-site",
      path: "/group/",
    },
    {
      title: "应用",
      href: "/apptype/new",
      path: "/apptype/",
    },
    {
      title: "博客",
      href: "/blog",
      path: "/blog",
    },
  ],
}

export const AllNavConfigs:{[key: string]: NavConfig} = {
  en: enNavConfig,
  zh: zhNavConfig,
}