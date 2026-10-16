import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, postUrl } from '../blog/posts';
import { blogDescription, blogTitle } from '../blog/site';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: blogTitle,
    description: blogDescription,
    // Channel <link> points at the blog; item links are absolute paths, so they resolve the same.
    site: new URL('/blog/', context.site ?? 'https://tryfasting.github.io').href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
      categories: post.data.tags,
    })),
    customData: '<language>ko-KR</language>',
  });
}
