'use client';

import { cn } from '@/lib/utils';
import { AppTypeListQueryResult } from '@/sanity.types';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface AppTypeListClientProps {
  lang: string;
  categoryList: AppTypeListQueryResult;
}

export default function AppTypeListClient({ lang, categoryList }: AppTypeListClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState<string>('');
  
  useEffect(() => {
    // 从路径中提取分类
    const segments = pathname.split('/');
    // 查找 apptype 后面的段落作为分类
    const apptypeIndex = segments.findIndex(segment => segment === 'apptype');
    if (apptypeIndex !== -1 && segments[apptypeIndex + 1]) {
      setActiveCategory(segments[apptypeIndex + 1]);
    }
  }, [pathname]);

  const handleCategoryClick = useCallback((slug: string) => {
    setActiveCategory(slug);
  }, []);

  // 确保categoryList存在
  if (!Array.isArray(categoryList)) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categoryList.map((item) => {
        if (!item.slug) return null;
        
        return (
          <Link
            key={item._id}
            href={`/${lang}/apptype/${item.slug}`}
            onClick={() => handleCategoryClick(item.slug || '')}
            className={cn(
              'border text-sm font-medium py-1 px-3 cursor-pointer rounded-full',
              'hover:bg-primary/90 hover:text-primary-foreground',
              'dark:text-foreground dark:hover:bg-primary-800',
              'transition-colors duration-200',
              activeCategory === item.slug ? "bg-primary text-primary-foreground" : ""
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
