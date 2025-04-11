import AppTypeList from "@/components/apptype-list";
import { FeaturePageHeader } from "@/components/feature-page-header";
import { AllApplicationConfigs } from "@/config/application";

interface AppListLayoutProps {
    children: React.ReactNode;
    params: { lang: string };
}

export default async function AppListLayout({ params, children }: AppListLayoutProps) {
    const { lang } = params;
    const applicationConfig = AllApplicationConfigs[lang];

    return (
        <div className="min-h-screen pb-16">
            <div className="bg-linear py-10">
                <FeaturePageHeader 
                    className="container"
                    heading={applicationConfig.title}
                    text={applicationConfig.subtitle}
                />
            </div>

            <div className="container relative mt-8 flex flex-col gap-8">
                <nav className="sticky top-20 z-40 bg-background/95 pb-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <AppTypeList lang={lang} />
                </nav>
                {children}
            </div>
        </div>
    );
}