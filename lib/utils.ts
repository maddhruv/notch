import dayjs from "dayjs";

export const getPageTitle = (properties) => properties.Name.title[0].plain_text;

export const getFormattedDate = (date) => dayjs(date).format("MMM D, YYYY");

export const getTags = (properties) =>
  properties.Tags.multi_select.map((tag) => tag.name);

export const getCover = (properties) => properties?.Cover?.url;

export const getDescription = (properties) =>
  properties?.Description?.rich_text[0]?.plain_text;

export const isSSR = typeof window === "undefined";
