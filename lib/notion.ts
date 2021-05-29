import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
import { getSiteConfig } from "./siteConfig";
import { getPageTitle, getFormattedDate } from "./utils";
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const notionAPI = new NotionAPI();

const siteConfig = getSiteConfig();

export interface Page {
  id: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  title: any;
  cover?: string;
  description: string;
}

export const getPages = async (): Promise<Page[]> => {
  const database = await notion.databases.query({
    database_id: siteConfig.notion.databaseId,
  });

  return database.results
    .map((page) => {
      // @ts-ignore
      if (!page.properties.Name.title.length) return false;

      return {
        id: page.id,
        created_at: getFormattedDate(page.created_time),
        updated_at: getFormattedDate(page.last_edited_time),
        // @ts-ignore
        tags: page.properties.Tags.multi_select.map((tag) => tag.name),
        // @ts-ignore
        title: getPageTitle(page.properties),
        // @ts-ignore
        cover: page.properties.Cover.url,
        // @ts-ignore
        description: page.properties.Description.rich_text[0].plain_text,
      };
    })
    .filter((page) => !!page) as Page[];
};

export const getPage = async (title: string) => {
  const pageSearch = await notion.search({
    query: title,
  });
  const pageId = pageSearch.results[0].id;

  const recordMap = await notionAPI.getPage(pageId);
  const page = await notion.pages.retrieve({
    page_id: pageId,
  });

  return {
    recordMap,
    pageProperties: {
      title: getPageTitle(page.properties),
      created_at: getFormattedDate(page.created_time),
    },
  };
};
