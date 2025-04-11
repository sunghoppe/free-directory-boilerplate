import ApplicationGridCient from "@/components/app-grid-client";
import { COMMON_PARAMS } from "@/lib/constants";
import { ApplicationListByCategoryQueryResult, ApplicationListOfFeaturedQueryResult, ApplicationListOfRecentQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { applicationListByCategoryQuery, applicationListOfFeaturedQuery, applicationListOfRecentQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";

interface AppTypePageProps {
    params: {
        lang: string;
        type: string;
    }
}

export async function generateMetadata({ params }: AppTypePageProps): Promise<Metadata> {
    const { lang, type } = params;
    return {
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Apps`,
    };
}

export default async function AppListPage({ params }: AppTypePageProps) {
    const { lang, type: category } = params;
    const queryParams = { ...COMMON_PARAMS, lang };

    try {
        let applicationListQueryResult: ApplicationListByCategoryQueryResult | ApplicationListOfFeaturedQueryResult | ApplicationListOfRecentQueryResult;
        
        switch (category) {
            case 'featured':
                applicationListQueryResult = await sanityFetch<ApplicationListOfFeaturedQueryResult>({
                    query: applicationListOfFeaturedQuery,
                    params: queryParams,
                    next: { revalidate: 60 }
                });
                break;
            case 'new':
                applicationListQueryResult = await sanityFetch<ApplicationListOfRecentQueryResult>({
                    query: applicationListOfRecentQuery,
                    params: {
                        ...queryParams,
                        limit: 24,
                    },
                    next: { revalidate: 60 }
                });
                break;
            default:
                applicationListQueryResult = await sanityFetch<ApplicationListByCategoryQueryResult>({
                    query: applicationListByCategoryQuery,
                    params: {
                        ...queryParams,
                        categorySlug: category
                    },
                    next: { revalidate: 60 }
                });
        }

        if (!applicationListQueryResult) {
            console.warn('No applications found for category:', category);
            return <div className="text-center py-10">No applications found.</div>;
        }

        return (
            <ApplicationGridCient 
                lang={lang} 
                itemList={applicationListQueryResult}
                category={category} 
            />
        );
    } catch (error) {
        console.error('Error loading applications:', error);
        return <div className="text-center py-10">Failed to load applications.</div>;
    }
}