interface BlogConfig {
    title: string;
    subtitle: string;
    backToList: string;
}

const enBlogConfig: BlogConfig = {
    title: "Blog Posts",
    subtitle: "This section includes blog posts to make announcements or change logs about this site.",
    backToList: "See all posts"
};

const zhBlogConfig: BlogConfig = {
    title: "博客文章",
    subtitle: "这里包含了关于本站的公告和更新日志",
    backToList: "查看全部文章"
};

export const AllBlogConfigs: { [key: string]: BlogConfig } = {
    en: enBlogConfig,
    zh: zhBlogConfig,
}