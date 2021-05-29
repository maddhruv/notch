import dayjs from "dayjs";

export const getPageTitle = (properties) => {
  return properties.Name.title[0].plain_text;
};

export const getFormattedDate = (date) => {
  return dayjs(date).format("MMM D, YYYY");
};

export const isSSR = typeof window === "undefined";
