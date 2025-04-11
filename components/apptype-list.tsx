import { AppTypeListQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { appTypeListQuery } from "@/sanity/lib/queries";
import { Suspense } from "react";
import AppTypeListClient from "./apptype-list-client";
import AppTypeListLoading from "./apptype-list-loading";
import { COMMON_PARAMS } from "@/lib/constants";

export default function AppTypeList({ lang }: { lang: string }) {
    return (
        <Suspense fallback={<AppTypeListLoading />}>
            <AppTypeListRSC lang={lang} />
        </Suspense>
    );
}

async function AppTypeListRSC({ lang }: { lang: string }) {
    const queryParams = { ...COMMON_PARAMS, lang };
    
    try {
        const appTypeListQueryResult = await sanityFetch<AppTypeListQueryResult>({
            query: appTypeListQuery,
            params: queryParams,
            next: { revalidate: 60 } // 添加缓存控制
        });

        if (!appTypeListQueryResult) {
            console.warn('No app types found');
            return null;
        }

        return (
            <AppTypeListClient lang={lang} categoryList={appTypeListQueryResult} />
        );
    } catch (error) {
        console.error('Error fetching app types:', error);
        return null;
    }
}
