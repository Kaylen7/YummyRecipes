import { NotionToMarkdown } from "notion-to-md";
import { Client } from "@notionhq/client";
import { PostType } from "@/app/page";
import { unstable_noStore as noStore } from 'next/cache';

const auth = `${process.env.NEXT_PUBLIC_NOTION_TOKEN}`;

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_TOKEN as string,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getAllPublished (): Promise<PostType[]> {

  noStore();

  const db = await notion.databases.retrieve({
    database_id: process.env.NEXT_PUBLIC_DATABASE_ID as string,
  });
  
  const dbWithSources = db as unknown as { data_sources: { id: string }[] };

  const dataSourceId = dbWithSources.data_sources[0]?.id;


  const posts = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: "title",
      title: {
        does_not_equal: "",
      },
    },
  });
  const allPosts: any = posts.results;
  const postData: PostType[] = [];

  for (const post of allPosts) {
    const data = await getPageMetadata(post);
    if (data.title.length > 0 && (data.tags.join(' ').indexOf('!!!') === -1)) {
        postData.push(data);
    }
  }

  return postData;
};

const getPageMetadata = async (post: any): Promise<PostType> => {
  const getTags = (tags: { name: string }[]) => {
    const allTags = tags.map((tag) => {
      return tag.name;
    });
    return allTags;
  };

  const getIngredients = (ingredient: { name: string }[]) => {
    const allIngredients = ingredient.map((ing) => {
      return ing.name;
    });
    return allIngredients;
  };

  const getTitle = (titles: { plain_text: string }[]) => {
    const allTitles = titles.map((title) => {
      return title.plain_text;
    });
    return allTitles;
  };

  return {
    id: post.id,
    title: getTitle(post.properties.Receta.title),
    tags: getTags(post.properties.Etiquetas.multi_select),
    ingredientes: getIngredients(post.properties.Ingredientes.multi_select),
    url: post.url,
    slug: post.id,
  };
};

export const getSinglePost = async (id: string): Promise<any> => {
    console.log(`getSinglePost: Getting post content... ${id}`)
  try {
    const response = await fetch(`https://api.notion.com/v1/pages/${id}`, {
    method: 'GET',
    headers: {
        'Authorization': auth,
        'Notion-Version': '2022-06-28'
    }
  });
    const responseData = await response.json();
    const metadata = await getPageMetadata(responseData);
    const mdblocks = await n2m.pageToMarkdown(responseData.id);
    const mdString = n2m.toMarkdownString(mdblocks);
    return {
        success: true,
        metadata,
        markdown: mdString,
    }
  } catch (err) {
    console.error(`Error getting page ${err}`)
    return { success: false, error: 'There was an error' }
  }
};
