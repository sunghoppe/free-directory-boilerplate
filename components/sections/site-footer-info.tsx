import { AllSiteConfigs } from "@/config/site";
import Link from "next/link";
import { Icons } from "../shared/icons";
import { Logo } from "../shared/logo";
import { Button } from "../ui/button";
import Image from "next/image";

interface SiteFooterInfoProps extends React.HTMLAttributes<HTMLElement> {
  lang: string;
}

export function SiteFooterInfo({ lang }: SiteFooterInfoProps) {
  // console.log('SiteFooterInfo, lang:', lang);
  const siteConfig = AllSiteConfigs[lang];

  return (
    <section>
      <div className="space-y-4">

        <div className="items-center space-x-2 flex">
          <Logo />
          <span className="dark:text-foreground text-xl font-bold sm:inline-block text-gradient-indigo-purple">
            {siteConfig.name}
          </span>
        </div>

        <p className="text-muted-foreground text-md p4-4 md:pr-12 text-balance">
          {siteConfig.subtitle}
        </p>

      </div>

    </section>
  );
}