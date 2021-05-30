import { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { NotionRenderer } from "react-notion-x";

import Title from "../../components/Title";
import { useDarkMode } from "../../components/DarkMode";

import { getPage, PageRenderer, getPages } from "../../lib/notion";
import { getSiteConfig, SiteConfig } from "../../lib/siteConfig";
import { isSSR } from "../../lib/utils";

interface Props {
  page: PageRenderer;
  siteConfig: SiteConfig;
}

const BlogPost: NextPage<Props> = ({ page, siteConfig }) => {
  const {
    pageProperties: { title, created_at, description, cover },
  } = page;

  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (!isSSR) {
      const notionViewport =
        document.getElementsByClassName("notion-viewport")[0];
      if (notionViewport) {
        notionViewport.remove();
      }
    }
  }, []);

  return (
    <div>
      <Head>
        <title>
          {title} - {siteConfig.name}
        </title>
        <meta name="description" content={description} />
      </Head>
      <Title title={title} />
      <p className="mb-8 dark:text-white-dark">{created_at}</p>
      {cover && <img src={cover} className="w-1/2 mb-4 mx-auto thumbnail" />}
      <NotionRenderer recordMap={page.recordMap} darkMode={isDarkMode} />
    </div>
  );
};

export async function getStaticProps(context) {
  const title = context.params.title;

  const page = await getPage(title);
  const siteConfig = getSiteConfig();

  return { props: { page, siteConfig } };
}

export async function getStaticPaths() {
  const pages = await getPages();

  return {
    paths: pages.map((page) => `/b/${page.title.split(" ").join("-")}`),
    fallback: false,
  };
}

export default BlogPost;
