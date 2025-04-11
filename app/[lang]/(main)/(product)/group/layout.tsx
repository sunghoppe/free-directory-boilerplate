import { FeaturePageHeader } from "@/components/feature-page-header";
import GroupListClient from "@/components/group-list-client";
import { AllProductConfigs } from "@/config/product";
import { COMMON_PARAMS } from "@/lib/constants";
import { getCurrentUser } from "@/lib/session";
import { GroupListWithCategoryQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { groupListWithCategoryQuery } from "@/sanity/lib/queries";

interface ProductListLayoutProps {
    params: { lang: string };
    children: React.ReactNode;
}

export default async function ProductListLayout({ params, children }: ProductListLayoutProps) {
    console.log('ProductListLayout, params:', params); // params: { lang: 'en' }
    const { lang } = params;
    const queryParams = { ...COMMON_PARAMS, lang };
    // console.log('ProductListLayout, language:', lang); // language: en
    // console.log('ProductListLayout, queryParams:', queryParams); // queryParams: { defaultLocale: 'en', lang: 'en' }

    const user = await getCurrentUser();
    const productConfig = AllProductConfigs[lang];

    const groupListQueryResult = await sanityFetch<GroupListWithCategoryQueryResult>({
        query: groupListWithCategoryQuery,
        params: queryParams,
    });
    // console.log('ProductListLayout, groupListQueryResult:', groupListQueryResult);

    return (
        <div className="min-h-screen pb-16">
            {/* Page Header */}
            <div className="bg-linear py-10">
                <FeaturePageHeader className="container"
                    heading={productConfig.title}
                    text={productConfig.subtitle}>
                    {/* Removed ShareProductButton with submitButton */}
                </FeaturePageHeader>
            </div>

            <div className="container mt-8 grid md:grid-cols-12 md:gap-8">
                {/* Group List */}
                <div className="md:col-span-2">
                    <GroupListClient lang={lang} itemList={groupListQueryResult} />
                </div>

                {/* Category List & Product Grid */}
                <div className="md:col-span-10">
                    {children}
                </div>
            </div>
        </div>
    );
}