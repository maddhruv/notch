import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
import { getSiteConfig } from "./siteConfig";
import {
  getPageTitle,
  getFormattedDate,
  getTags,
  getCover,
  getDescription,
} from "./utils";
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
        tags: getTags(page.properties),
        title: getPageTitle(page.properties),
        cover: getCover(page.properties),
        description: getDescription(page.properties),
      };
    })
    .filter((page) => !!page) as Page[];
};

export interface PageRenderer {
  recordMap: any;
  pageProperties: {
    title: string;
    created_at: string;
    desription: string;
  };
}

export const getPage = async (title: string): Promise<PageRenderer> => {
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
      desription: getDescription(page.properties),
    },
  };
};
